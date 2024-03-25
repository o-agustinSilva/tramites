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
  headers: {
    Authorization: localStorage.getItem("token") ? `Bearer ${accessToken}` : "",
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (accessToken) {
    req.headers.Authorization = localStorage.getItem("token")
      ? `Bearer ${accessToken}`
      : "";
    const user = jwtDecode(accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const res = await axios.post(`${baseURL}/token/refresh/`, {
      refresh: refresh_token,
    });

    localStorage.setItem("token", JSON.stringify(res.data.access));
    req.headers.Authorization = `Bearer ${res.data.access}`;
    return req;
  } else {
    req.headers.Authorization = localStorage.getItem("token")
      ? `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      : " ";
    return req;
  }
});

export default axiosInstance;
