import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profile";
import VerifyEmail from "./components/VerifyEmail";
import ForgetPassword from "./components/ForgetPassword";

import { LoginPage } from "./pages/LoginPage";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/dashboard" element={<Profile/>} />
          <Route path="/otp/verify" element={<VerifyEmail/>} />
          <Route path="/forget_password" element={<ForgetPassword/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
