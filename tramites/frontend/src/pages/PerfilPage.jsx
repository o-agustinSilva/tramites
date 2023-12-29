import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileImage from "../components/ProfileImage";
import ProfileBox from "../components/ProfilBox";
import EditProfil from "../components/EditProfil";

export function PerfilPage() {    
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