import react from 'react';
import RequireAuth from './components/RequireAuth';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import NewTramite from './pages/NewTramite';


const ROLES = {
  'User': 'citizen',
  'Editor': 'police',
  'Admin': 'administrator'
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
          

          {/* Rutas protegidas */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Editor]} />} >
              <Route path="/dashboard" element={<PerfilPage />} />
              <Route path="/misTramites" element={<MisTramitesPage />} />
              <Route path="/requestTramite" element={<RequestTramitePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/tramite" element={<TramitePage />} />
            </Route>

            {/* Rutas que precisan rol de policia/administrador */}
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />} >
              <Route path="/pago" element={<MedioPagoPage />} />
              <Route path="/registrePolice" element={<SignupPolicePage />} />
              <Route path="/newTramite" element={<NewTramite />} />
              
            </Route>
          </Route>
          {/* Catch all */}

        </Routes>
    </>
  );
}

export default App;
