import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormNewTramite from "../components/ADMIN_CreateTramite";


function NewTramite() {
  return(
  <div className="App" > 
      <Header/>
       <FormNewTramite/>
      <Footer/>  
  </div>

)}

export default NewTramite;
