import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileImage from "../components/ProfileImage";
import PROFILE_Tramites from "../components/PROFILE_Tramites";
import PROFILE_PersonalInfo from "../components/PROFILE_PersonalInfo";
import PROFILE_PhoneNumber from "../components/PROFILE_PhoneNumber";
import PROFILE_Email from "../components/PROFILE_Email";
import PROFILE_Password from "../components/PROFILE_Password";

export function PerfilPage() {    

  
    return ( 
        <div>
            <Header/>
             <ProfileImage/>
             <PROFILE_PersonalInfo/>
             <PROFILE_PhoneNumber/>
             <PROFILE_Email/>
             <PROFILE_Password/>
            <Footer/>
        </div>
    )
}