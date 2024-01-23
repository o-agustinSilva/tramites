import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import TRAMITES_TramiteDetail from '../components/TRAMITE_TramiteDetail';

export function TramitePage() {
  return (
    <div className='App'>
      <Header/>
      <TRAMITES_TramiteDetail/>
      <Footer/>
    </div>
  )
}
