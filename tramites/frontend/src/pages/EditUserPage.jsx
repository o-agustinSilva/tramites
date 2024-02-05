import React from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ADMIN_EditUser from "../components/ADMIN_EditUser";

export function EditUserPage() {
  const { id } = useParams();

  return (
    <div className='App'>
        <Header/>
        <ADMIN_EditUser id={id}/>
        <Footer/>
    </div>  
  )
}
