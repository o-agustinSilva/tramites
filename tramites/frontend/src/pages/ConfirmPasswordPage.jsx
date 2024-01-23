import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ConfirmPassword from "../components/ConfirmPassword";

 export function ConfirmPasswordPage() {    
    return ( 
        <div className="App">
            <Header/>
            <ConfirmPassword/>
            <Footer/>
        </div>
    )
}