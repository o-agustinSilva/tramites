import React, { Component } from "react";
import Login from "../components/Login";
import Header from "../components/Header";
import Footer from "../components/Footer";

export function LoginPage() {    
    return ( 
        <div>
            <Header/>
            <Login/>
            <Footer/>
        </div>
    )
}