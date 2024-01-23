import React from "react";
import { useLocation } from 'react-router-dom';
import Header from "../components/Header";
import VerifyEmail from "../components/VerifyEmail";
import Footer from "../components/Footer";

export function VerifyPage() {
  // Obtengo el correo que recibo como parámetro
  const location = useLocation();
  const email = location.state?.email;

  return (
    <div className="App">
      <Header />
      <VerifyEmail email={email || ''} />
      <Footer />
    </div>
  );
};