import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MercadoPago } from "../components/MercadoPago";
import PagoTramite from "../components/PagoTramite";

export function MedioPagoPage() {
  return (
    <div>
      <Header />
      <MercadoPago/>
      <PagoTramite/>
      <Footer />
    </div>
  );
}
