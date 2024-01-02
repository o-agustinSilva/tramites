import React, { Component } from "react";
import Header from "../components/Header";
import ProfileImage from "../components/ProfileImage";
import TableTramites from "../components/TableTramites";


export function MisTramitesPage() {    
    return ( 
        <div>
            <Header/>
            <ProfileImage/>
            <TableTramites/>
        </div>
    )
}