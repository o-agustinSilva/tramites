import React, { Component } from "react";
import Inicio from "../components/Inicio";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cards2 from "../components/Cards2";

export function InicioPage() {    
    return ( 
        <div className="App">
            <Header/>
             <Inicio/>
             <Cards2/>
            <Footer/>
        </div>
    )
}