import React, { useState } from "react";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from "axios";

function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
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
      // Validar credenciales
      const res = await axios.post("http://localhost:8000/api/login/", logindata);
      const response = res.data;

      // Obtener datos adicionales del usuario
      const resData = await axios.get(`http://localhost:8000/api/user-details/${logindata.email}/`);
      const responseData = resData.data;

      if (res.status === 200) {
        const user = {
          fullname: response.fullname,
          email: response.email,
          role: response.role,
        };

        const userData = responseData;

        setAuth({ user: user, token: response.token });
        localStorage.setItem("token", JSON.stringify(response.access_token));
        localStorage.setItem("refresh_token", JSON.stringify(response.refresh_token));
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("user_data", JSON.stringify(userData));
        navigate(from, { replace: true });
      } else {

        toast.error(response);
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.detail);

      // Utiliza la navegación para llevarlo a la pantalla OTP
      if (error.response.data.detail === "El correo electrónico no se encuentra verificado") {
        try {
          const res = await axios.post("http://localhost:8000/api/resend-otp/", {
            email: logindata.email,
          });
          navigate('/otp/verify', { state: { email: logindata.email } });
        } catch (error) {
          toast.error(error.response.data.message);
        }

      }
    }
  };

  return (
    <Container className="d-flex justify-content-center my-auto p-5">
      <div id="login-box" className="p-4">
        <h2 id="loginTitle">Iniciar sesión</h2>
        <form className="loginForm" onSubmit={handleSubmit}>
          <Row className="d-flex mt-4">
            <Col md={12}>
              <MDBInput
                label="Correo electrónico"
                type="email"
                className="custom-input"
                id="loginEmail"
                name="email"
                value={logindata.email}
                onChange={handleLoginData}
              />
            </Col>
          </Row>

          <Row className="d-flex mt-4">
            <Col md={12}>
              <MDBInput
                label="Contraseña"
                type="password"
                className="custom-input"
                id="loginPassword"
                name="password"
                value={logindata.password}
                onChange={handleLoginData}
              />
            </Col>
          </Row>


          <Row>
            <div className="smallText">
              <Col md={12} className="d-flex justify-content-left">
                <small id="forgotPassword" className="form-text text-muted">
                  <Link to="/forget-password">¿Olvidaste tu contraseña?</Link>
                </small>
              </Col>
            </div>
          </Row>

          <Row className="d-flex mt-3">
            <div className="d-grid gap-2">
              <MDBBtn type="submit" color="success">
                Continuar
              </MDBBtn>
            </div>
          </Row>
          <hr className="mt-4"/>
          <Row>
            <Col md={12}>
              <p style={{color:"black"}}>¿No contas con una cuenta?</p>
            </Col>
            <Col md={12}>
              <Link to="/signup">
                <div className="d-grid gap-2">
                  <MDBBtn color="info">
                    Registrarse
                  </MDBBtn>
                </div>
              </Link>
            </Col>
          </Row>
        </form>
      </div>
    </Container>
  );
}

export default Login;
