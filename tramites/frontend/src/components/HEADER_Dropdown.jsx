import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const HEADER_Dropdown = () => {
    const navigate = useNavigate();
    const refresh = JSON.parse(localStorage.getItem("refresh_token"));

    const handleLogout = async () => {
        const res = await axiosInstance.post("/logout/", {
            refresh_token: refresh,
        });

        if (res.status === 200) {
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("access");
            localStorage.removeItem("user");
            navigate("/login");
            toast.warn("logout successful");
        }
    };

    return (
        <div className="mb-2">
            <DropdownButton
                id="loginDropdown"
                variant="info"
                title="Perfil"
            >

                <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4" onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}

export default HEADER_Dropdown