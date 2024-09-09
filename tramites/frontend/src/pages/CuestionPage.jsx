import React, { Component } from "react";
import Inicio from "../components/Inicio";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cuestion from "../components/Cuestion";
export function CuestionPage() {   
    return ( 
        <div className="App">
            <Header/>
            <Inicio/>
            <Cuestion/>
            <Footer/>
        </div>
    )
}