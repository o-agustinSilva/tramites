import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
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