import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PROFILE_Image from "../components/PROFILE_Image";
import TableTramites from "../components/TableTramites";


export function MisTramitesPage() {    
    return ( 
        <div className="App">
            <Header/>
            <TableTramites/>
            <Footer/>
        </div>
    )
}