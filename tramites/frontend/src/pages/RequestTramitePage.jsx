import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoTramite from "../components/InfoTramite ";
import RequestTramite from "../components/RequestTramite";
import Documentacion from "../components/Documentacion";

export function RequestTramitePage() {    
    return ( 
        <div>
            <Header/>
             <InfoTramite/>
             <RequestTramite/>  
             <Documentacion/>
            <Footer/>
        </div>
    )
}