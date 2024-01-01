import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import VerifyEmail from "./components/VerifyEmail";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { VerifyPage } from "./pages/VerifyPage";
import { ForgetPasswordPage } from "./pages/ForgetPasswordPage";
import PasswordResetRequest from "./components/PasswordResetRequest";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <ToastContainer position="bottom-center" autoClose={8000} pauseOnFocusLoss={false}/>
          <Routes>
            <Route path='/signup' element={<SignupPage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/dashboard' element={<Profile/>} />
            <Route path='/otp/verify' element={<VerifyPage/>} />
            <Route path='/forget-password' element={<PasswordResetRequest/>}/>
            <Route path='/password-reset-confirm/:uid/:token' element={<ForgetPasswordPage/>}/>
          </Routes>
      </Router>
    </>
  );
}

export default App;
