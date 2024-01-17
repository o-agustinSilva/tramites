import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Correo electrónico no válido");
    }

    try {
      const res = await axios.post("http://localhost:8000/api/password-reset/", { email: email });
      const response = res.data;

      if (res.status === 200) {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div id="forgetpassword-container">
      <Container className="d-flex justify-content-center">
        <div id="forgetpassword-card" className="p-4">
          <Row>
            <Col md={12}>
              <h2>Recuperación de cuenta</h2>
            </Col>
          </Row>

          <Form onSubmit={handleSubmit}>
            <Row className="d-flex mt-3">
              <Col md={12}>
                <MDBInput
                  label="Correo electrónico"
                  id="email"
                  type="email"
                  className="custom-input"
                  name="email"
                  value={email}
                  onChange={handleEmail}
                  autoComplete="off"
                ></MDBInput>
              </Col>
            </Row>
            <Row className="d-flex mt-3">
              <div className="d-grid gap-2">
                <MDBBtn type="submit" color="success">
                  Enviar
                </MDBBtn>
              </div>
            </Row>


          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ForgetPassword;
