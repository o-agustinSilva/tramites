import react, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Profile";
import VerifyEmail from "./components/VerifyEmail";
import PasswordResetRequest from "./components/PasswordResetRequest";
import SignUp from "./components/SignUp";
import ForgetPassword from "./components/ForgetPassword";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { VerifyPage } from "./pages/VerifyPage";
import { ForgetPasswordPage } from "./pages/ForgetPasswordPage";
import { PerfilPage } from "./pages/PerfilPage";
import { MisTramitesPage } from "./pages/MisTramitesPage";
import { InicioPage } from "./pages/InicioPage";
import { RequestTramitePage } from "./pages/RequestTramitePage";
import { MedioPagoPage } from "./pages/MedioPagoPage";
import "./App.css";
import { AdminPage } from './pages/AdminPage';


// Resto del código...

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <ToastContainer
          position="bottom-center"
          autoClose={8000}
          pauseOnFocusLoss={false}
        />
        <Routes>
          <Route path="/" element={<InicioPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<PerfilPage />} />
          <Route path="/otp/verify" element={<VerifyPage />} />
          <Route path="/forget-password" element={<PasswordResetRequest />} />
          <Route path="/password-reset-confirm/:uid/:token" element={<ForgetPasswordPage />} />
          <Route path="/misTramites" element={<MisTramitesPage />} />
          <Route path="/requestTramite" element={<RequestTramitePage />} />
          <Route path="/pago" element={<MedioPagoPage />} />
          <Route path="/admi" element={<AdminPage />} />
     
        </Routes>
      </Router>
    </>
  );
}

export default App;
