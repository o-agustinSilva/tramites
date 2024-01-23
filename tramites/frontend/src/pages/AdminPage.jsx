import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AdminTab } from "../components/AdminTab";
import AdminUser from "../components/AdminUser";


export function AdminPage(){
   return(
       <div className="App">
           <Header/>
           <AdminUser/>
           <AdminTab/>
           <Footer />
        </div>
   )
}

