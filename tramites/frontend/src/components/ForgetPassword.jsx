import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";

const ForgetPassword = () => {

  const handlePost = (e) => {
    e.preventDefault();
  }
  return (
    <div id="forgetpassword-container"> 
      <Container className="d-flex justify-content-center">
        <div id="forgetpassword-card" className="px-4">
          <Row>
            <Col
              md="12"
              className="d-flex justify-content-center text-align-center mt-2"
            >
              <h3>Cambio de clave</h3>
            </Col>
          </Row>
          <form className="signup-form" onSubmit={handlePost}>
           <Row>
            <Col md="12" className="mb-3">
            <MDBInput
                  label="Contraseña"
                  id="password"
                  type="password"
                  className="custom-input"
                />
            </Col>
           </Row>
           <Row>
            <Col md="12" className="mb-3">
            <MDBInput
                  label="Nueva contraseña"
                  id="newPassword"
                  type="password"
                  className="custom-input"
                />
            </Col>
           </Row>
           <Row>
            <Col md="12" className="mb-3">
            <MDBInput
                  label="Confirmar contraseña"
                  id="confirmPassword"
                  type="password"
                  className="custom-input"
                />
            </Col>
           </Row>

           <Row>
              <Col
                md={12}
                className="d-flex justify-content-center text-align-center mt-2"
              >
                <Link to="/dashboard">
                  <button type="submit" className="buttonPrimary">
                    Confirmar
                  </button>
                </Link>
              </Col>
            </Row>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default ForgetPassword