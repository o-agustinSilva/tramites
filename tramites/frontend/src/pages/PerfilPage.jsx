import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PROFILE_Tabs from "../components/PROFILE_Tabs";

export function PerfilPage() {    
    return ( 
        <div className="App">
            <Header/>
             <PROFILE_Tabs/>
            <Footer/>
        </div>
    )
}