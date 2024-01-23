import React from 'react'
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBIcon } from 'mdb-react-ui-kit';
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
            localStorage.removeItem("user");
            navigate("/login");
            toast.warn("logout successful");
        }
    };

    return (
        <MDBDropdown group>
            <MDBDropdownToggle size='lg' tag='a' className='btn btn-primary d-flex align-items-center'>
                <MDBIcon far icon="user-circle" size='2x' style={{ marginRight: '10px' }} />
                <span>Mi perfil</span>
            </MDBDropdownToggle>
            <MDBDropdownMenu>
                <MDBDropdownItem link href="/dashboard">
                    <MDBIcon fas icon="user-alt" style={{ marginRight: '8px' }} />
                    Cuenta
                </MDBDropdownItem>
                <MDBDropdownItem link href="/misTramites">
                    <MDBIcon fas icon="file-alt" style={{ marginRight: '8px' }} />
                    Mis trámites
                </MDBDropdownItem>
                <MDBDropdownItem divider />

                <MDBDropdownItem id="dropdownLogout" link onClick={handleLogout}>
                    <MDBIcon fas icon="sign-out-alt" style={{ marginRight: '8px' }} />
                    Cerrar sesión
                </MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown>
    )
}

export default HEADER_Dropdown