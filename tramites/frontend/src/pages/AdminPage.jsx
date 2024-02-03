import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ADMIN_Tabs } from "../components/ADMIN_Tabs";


export function AdminPage(){
   return(
       <div className="App">
           <Header/>
           <ADMIN_Tabs/>
           <Footer />
        </div>
   )
}

