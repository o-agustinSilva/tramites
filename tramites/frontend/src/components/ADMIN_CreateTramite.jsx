import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MDBInput, MDBTextArea, MDBCheckbox, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export function FormNewTramite() {

  const handleSubmit = () => {
    console.log("registrado!")
  }

  return (
    <Container className="d-flex justify-content-center">
      <div id="signup-card" className="p-4 m-5">
        <Row>
          <Col
            md="12"
            className="d-flex justify-content-center text-align-center">
            <h2 style={{ color: "black" }}>Nuevo trámite</h2>
          </Col>
        </Row>
        <form onSubmit={handleSubmit}>
          <Row className="d-flex justify-content-center mt-4">
            <Col md={12} className="mb-3">
              <MDBInput
                label="Nombre del trámite"
                type="text"
                className="custom-input"
              />
            </Col>
            <Col md={12} className="mb-3">
              <MDBTextArea
                label="Descripción"
                type="text"
                className="custom-input"
              />
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <MDBInput
                label="Precio"
                type="number"
                className="custom-input"
              />
            </Col>
            <Col md={6} className="mb-3">
              <MDBInput
                label="Vigencia (en días)"
                type="number"
                className="custom-input"
                
              />
            </Col>
          </Row>

          <fieldset style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', position: 'relative' }}>
            <legend style={{ position: 'absolute', top: '-12px', left: '10px', fontSize: "15px", background: "#e8edf7", width: "70px" }}>Requisitos</legend>
            <Row>
              <Col md={6}>
                <MDBCheckbox value='option1' label='Fotocopia de DNI' />
              </Col>
              <Col md={6}>
                <MDBCheckbox value='option2' label='Datos familiares' />
              </Col>
            </Row>
          </fieldset>

          <Row className="d-flex mt-3">
            <div className="d-grid gap-2">
              <MDBBtn type="submit" color="success">
                Crear trámite
              </MDBBtn>
            </div>
          </Row>
        </form>
      </div>
    </Container>
  );
}

export default FormNewTramite;
