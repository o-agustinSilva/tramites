import axiosInstance from "../utils/axiosInstance";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
    const refresh = JSON.parse(localStorage.getItem("refresh_token"));
      const response = await axiosInstance.post('/token/refresh/', {
        refresh: refresh,
      });

      setAuth((prev) => {
        return { ...prev, token: response.data.access };
      });

      return response.data.access;
    } catch (error) {
      console.error("Error al refrescar el token:", error);
      throw new Error("Error al refrescar el token");
    }
  };

  return refresh;
};

export default useRefreshToken;