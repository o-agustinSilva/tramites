import react, { useState } from 'react';
import RequireAuth from './components/RequireAuth';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { VerifyPage } from "./pages/VerifyPage";
import { ForgetPasswordPage } from "./pages/ForgetPasswordPage";
import { ConfirmPasswordPage } from "./pages/ConfirmPasswordPage";
import { PerfilPage } from "./pages/PerfilPage";
import { MisTramitesPage } from "./pages/MisTramitesPage";
import { InicioPage } from "./pages/InicioPage";
import { RequestTramitePage } from "./pages/RequestTramitePage";
import { MedioPagoPage } from "./pages/MedioPagoPage";
import { TramitePage } from "./pages/TramitePage";
import PersistLogin from './components/PersistLogin';
import "./App.css";
import { AdminPage } from './pages/AdminPage';
import { SignupPolicePage } from './pages/SignupPolicePage';
import { EditUserPage } from './pages/EditUserPage';
import { EditTramitePage } from './pages/EditTramitePage';
import NewTramite from './pages/NewTramite';
import { PanelNotificacionPage } from './pages/PanelNotificacionPage';
import REQTRAMITE_Success from './components/REQTRAMITE_Success';
import REQTRAMITE_Failure from './components/REQTRAMITE_Failure';
import TRAMITE_Domicilio from './pdf/TRAMITE_Domicilio';
import TRAMITE_Comprobante from './components/TRAMITE_Comprobante'
import { CuestionPage } from './pages/CuestionPage';
import { ContactoPage } from './pages/ContactoPage';

const ROLES = {
  'User': 'citizen',
  'Editor': 'police',
  'Admin': 'admin'
}

function App() {

  return (
    <>
        <ToastContainer
          position="bottom-center"
          autoClose={8000}
          pauseOnFocusLoss={false}
        />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/unauthorized" element={<SignupPage/>} />
          <Route path="/" element={<InicioPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/otp/verify" element={<VerifyPage />} />
          <Route path="/password-reset-confirm/:uid/:token" element={<ConfirmPasswordPage />} />
          <Route path='test' element={<TRAMITE_Comprobante />} />
          <Route path='/Cuestion' element={<CuestionPage/>} />
          <Route path='/Contacto' element={<ContactoPage/>} />

          {/* Rutas protegidas */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Editor, ROLES.Admin]} />} >
              <Route path="/dashboard" element={<PerfilPage />} />
              <Route path="/misTramites" element={<MisTramitesPage />} />
              <Route path="/requestTramite/:id" element={<RequestTramitePage/>} />
              <Route path="/tramite/:id" element={<TramitePage />} />
              <Route path="/pago" element={<MedioPagoPage />} />
              <Route path="/paymentSuccessful" element={<REQTRAMITE_Success/>} />
              <Route path="/paymentFailed" element={<REQTRAMITE_Failure/>} />
            </Route>

            {/* Rutas que precisan rol de policia/administrador */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />} >
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/registrePolice" element={<SignupPolicePage />} />
              <Route path="/edit-user/:id" element={<EditUserPage />} />
              <Route path="/edit-tramite/:id" element={<EditTramitePage />} />
              <Route path="/new-tramite" element={<NewTramite />} />
              <Route path="/panelNotificacion" element={<PanelNotificacionPage />} />
            </Route>
          </Route>
        </Routes>
    </>
  );
}

export default App;
