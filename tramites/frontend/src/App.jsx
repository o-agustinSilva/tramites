import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import VerifyEmail from "./components/VerifyEmail";
import ForgetPassword from "./components/ForgetPassword";
import { PerfilPage } from "./pages/PerfilPage";
import { LoginPage } from "./pages/LoginPage";

import "./App.css";
import { MisTramitesPage } from "./pages/MisTramitesPage";
import { InicioPage } from "./pages/InicioPage";
import { RequestTramitePage } from "./pages/RequestTramitePage";
import { MedioPagoPage } from "./pages/MedioPagoPage";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<InicioPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/perfil" element={<PerfilPage/>} />
          <Route path="/otp/verify" element={<VerifyEmail/>} />
          <Route path="/forget_password" element={<ForgetPassword/>} />
          <Route path="/misTramites" element={<MisTramitesPage/>} />
          <Route path="/requestTramite" element={<RequestTramitePage/>} />
          <Route path="/pago" element={<MedioPagoPage/>} />
    
        </Routes>
      </Router>
    </>
  );
}

export default App;
