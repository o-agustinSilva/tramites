import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileImage from "../components/ProfileImage";
import ProfileBox from "../components/ProfilBox";
import EditProfil from "../components/EditProfil";

export function PerfilPage() {    
    const jwt = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
  
    useEffect(() => {
      if (jwt === null && !user) {
        navigate("/login");
      } 
    }, [jwt, user]);
  
    return ( 
        <div>
            <Header/>
             <ProfileImage/>
             <ProfileBox/>
             <EditProfil/>
            <Footer/>
        </div>
    )
}