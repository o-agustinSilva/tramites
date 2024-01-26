import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Documentacion from "../components/Documentacion";
import REQTRAMITE_Stepper from "../components/REQTRAMITE_Stepper"

export function RequestTramitePage() {    
    return ( 
        <div className="App">
            <Header/>
             <REQTRAMITE_Stepper/>  
            <Footer/>
        </div>
    )
}