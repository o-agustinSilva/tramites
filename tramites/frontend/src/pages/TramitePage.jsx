import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import TRAMITES_TramiteDetail from '../components/TRAMITE_TramiteDetail';
import { useParams } from 'react-router-dom';

export function TramitePage() {
  const { id } = useParams();

  return (
    <div className='App'>
      <Header/>
      <TRAMITES_TramiteDetail id={id}/>
      <Footer/>
    </div>
  )
}
