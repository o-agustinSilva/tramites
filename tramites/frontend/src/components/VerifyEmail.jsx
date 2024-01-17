import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import OtpInput from "react-otp-input";
import axios from "axios";
import { toast } from "react-toastify";
import { MDBBtn } from "mdb-react-ui-kit";


function VerifyEmail({ email }) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/verify-email/", {
        otp: otp,
      });
      const response = res.data;

      if (res.status === 200) {
        navigate("/login");
        toast.success(response.message);
      } else if (res.status === 204)
        toast.error(
          "El código expiró o el correo electrónico ya se encuentra verificado"
        );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/resend-otp/", {
        email: email,
      });
      const response = res.data;

      if (res.status === 200) {
        toast.success(response.message);
      } else if (res.status === 204) {
        toast.error(
          "El código expiró o el correo electrónico ya se encuentra verificado"
        );
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div id="otp-container">
      <Container className="d-flex justify-content-center align-items-center">
        <div id="otp-card" className="p-4">
          <Row>
            <Col md={12} className="mt-2">
              <h4>Verificar correo electrónico</h4>
            </Col>
            <Col md={12} className="mt-2">
              <p>
                Para completar la creación de tu cuenta, hemos enviado un código
                de 6 dígitos a la dirección de correo electrónico <b>{email}</b>
                . Por favor, introduce el código proporcionado a continuación
                para verificar tu correo electrónico.
              </p>
            </Col>
          </Row>
          <Form className="signup-form" onSubmit={handleSubmit}>
            <Row>
              <Col md={12} className="d-flex justify-content-center mb-2">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span></span>}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{
                    width: "100%",
                    height: "65px",
                    borderRadius: "10px",
                    border: "none",
                    margin: "5px",
                  }}
                  inputType="text"
                />
              </Col>
            </Row>

            <Row className="d-flex mt-3">
              <div className="d-grid gap-2">
                <MDBBtn type="submit" color="success">
                  Confirmar
                </MDBBtn>
              </div>
            </Row>

            <Row className="d-flex mt-2">
              <Col
                md={12}
              >
                <p>
                  ¿No te llegó el código?
                  <a href="#" onClick={handleResend}>
                    <b> Reenviar</b>
                  </a>
                </p>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default VerifyEmail;
