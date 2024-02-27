import React from "react";
import USER_Notificacion from "../components/USER_Notificacion";
import Header from "../components/Header";
import Footer from "../components/Footer";

export function PanelNotificacionPage() {
  return (
    <div className="App">
      <Header />
      <USER_Notificacion />
      <Footer />
    </div>
  );
}
