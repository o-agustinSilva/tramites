import React, { Component } from "react";
import Inicio from "../components/Inicio";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Contacto from "../components/Contacto";


export function ContactoPage() {   
    
    return ( 
        <div className="App">
            <Header/>
            <Inicio/>
            <Contacto/>
            <Footer/>
        </div>
    )
}