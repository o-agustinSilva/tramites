import React from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ADMIN_EditTramite from "../components/ADMIN_EditTramite";

export function EditTramitePage() {
  const { id } = useParams();

  return (
    <div className='App'>
        <Header/>
        <ADMIN_EditTramite id={id}/>
        <Footer/>
    </div>  
  )
}
