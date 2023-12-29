import React, { Component } from "react";
import Inicio from "../components/Inicio";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
export function InicioPage() {    
    return ( 
        <div>
            <Header/>
             <Inicio/>
             <Card/>
            <Footer/>
        </div>
    )
}