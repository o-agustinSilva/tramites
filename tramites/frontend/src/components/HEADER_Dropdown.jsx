import React, { useEffect } from 'react'
import useLogout from "../hooks/useLogout";
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const HEADER_Dropdown = () => {
    const logout = useLogout();
    const navigate = useNavigate();
    const refresh = JSON.parse(localStorage.getItem("refresh_token"));
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = async () => {
        const res = await axiosInstance.post("/logout/", {
            refresh_token: refresh,
        });

        if (res.status === 200) {
            logout();
            navigate("/login");
        }
    };

    return (

        <MDBDropdown group>

            <MDBDropdownToggle size="lg" tag='a' className='btn btn-primary d-flex align-items-center'>
                <MDBIcon far icon="user-circle" size='2x' style={{ marginRight: '10px', color: "#285192" }} />
                <span style={{ color: "#285192" }}>{user.fullname}</span>
            </MDBDropdownToggle>
            <MDBDropdownMenu id="headerDropdown">
                <MDBDropdownItem link href="/dashboard">
                    <MDBIcon fas icon="user-alt" style={{ marginRight: '8px' }} />
                    Cuenta
                </MDBDropdownItem>
                <MDBDropdownItem link href="/misTramites">
                    <MDBIcon fas icon="file-alt" style={{ marginRight: '8px' }} />
                    Mis trámites
                </MDBDropdownItem>

                <MDBDropdownItem id="dropdownLogout" link onClick={handleLogout}>
                    <MDBIcon fas icon="sign-out-alt" style={{ marginRight: '8px' }} />
                    Cerrar sesión
                </MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown>
    )
}

export default HEADER_Dropdown