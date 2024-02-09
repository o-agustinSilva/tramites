import React, { Component } from "react";
import Inicio from "../components/Inicio";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Inicio2 from "../components/Inicio2";

export function InicioPage() {    
    return ( 
        <div className="App">
            <Header/>
             <Inicio/>
             <Inicio2/>
            <Footer/>
        </div>
    )
}