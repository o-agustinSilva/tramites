import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [searchparams] = useSearchParams();
  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
  });

  const handleLoginData = (e) => {
    setLogindata({ ...logindata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/login/",
        logindata
      );
      const response = res.data;
      const user = {
        fullname: response.fullname,
        email: response.email,
      
      };

      if (res.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.access_token));
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(response.refresh_token)
        );
        localStorage.setItem("user", JSON.stringify(user));
        
        navigate("/dashboard");
      } else {
        toast.error(response);
      }
    } catch (error) {
      toast.error(error.response.data.detail);
    }
  };

  return (
    <div id="login-container">
      <Container className="d-flex justify-content-center">
        <div className="container-fluid" id="login-box">
          <h2 id="loginTitle">Iniciar sesión</h2>
          <form className="loginForm" onSubmit={handleSubmit}>
            <Row>
              <Col>
                <div className="form-group">
                  <label htmlFor="loginEmail">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="loginEmail"
                    aria-describedby="emailHelp"
                    name="email"
                    value={logindata.email}
                    onChange={handleLoginData}
                  />
                </div>
              </Col>
            </Row>

            <div className="form-group">
              <Row>
                <Col>
                  <label htmlFor="loginPassword">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="loginPassword"
                    name="password"
                    value={logindata.password}
                    onChange={handleLoginData}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className="smallText">
                    <small id="forgotPassword" className="form-text text-muted">
                      <Link to="#">¿Olvidaste tu contraseña?</Link>
                    </small>
                    <small id="createAccount" className="form-text text-muted">
                      <Link to="/signup">Registrarse</Link>
                    </small>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col
                  md={12}
                  className="d-flex justify-content-center text-align-center mb-3"
                >
                  <button type="submit" className="buttonPrimary">
                    Continuar
                  </button>
                </Col>
              </Row>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
