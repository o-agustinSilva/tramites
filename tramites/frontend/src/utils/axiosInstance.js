import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

let accessToken = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : "";
let refresh_token = localStorage.getItem("refresh_token")
  ? JSON.parse(localStorage.getItem("refresh_token"))
  : "";

const baseURL = "http://localhost:8000/api";
const axiosInstance = axios.create({
  baseURL: baseURL,
  "Content-type": "application/json",
  headers: {Authorization: localStorage.getItem("token") ? `Bearer ${accessToken}` : ""},
});

axiosInstance.interceptors.request.use(async (req) => {
  if (accessToken) {
    //  accessToken=localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
    req.headers.Authorization = localStorage.getItem('token') ? `Bearer ${accessToken}` : "";
    const user = jwtDecode(accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) {
      return req;
    } else {
      const res = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: refresh_token,
      });

      if (res.status === 200) {
        localStorage.setItem("access", JSON.stringify(res.data.access));
        req.headers.Authorization = `Bearer ${res.data.access}`;
        return req;
      } else {
        const res = await axios.post(`${baseURL}/logout/`, {
          refresh_token: refresh_token,
        });
        if (res.status === 204) {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem('access');
          localStorage.removeItem("user");
        }
      }
    }
  }
});

export default axiosInstance;
