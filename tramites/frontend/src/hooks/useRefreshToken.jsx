import axiosInstance from "../utils/axiosInstance";
import useAuth from "./useAuth";
import axios from "axios";
import useLogout from "./useLogout";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const logout = useLogout(); // Importar la función logout
  
  const refresh = async () => {
    try {
      const refresh = JSON.parse(localStorage.getItem("refresh_token"));
      const response = await axiosInstance.post('/token/refresh/', {
        refresh: refresh
      });

      const rolesResponse = await axios.get("http://localhost:8000/api/roles/");
      setAuth((prev) => {
        return { ...prev, 
          roles: rolesResponse.data.roles,
          token: response.data.access };
      });

      return response.data.access;
    } catch (error) {
      logout();
    }
  };

  return refresh;
};

export default useRefreshToken;