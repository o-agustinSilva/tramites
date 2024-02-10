// useLogout.jsx
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_data");
    navigate("/login");
  };

  return logout;
};

export default useLogout;
