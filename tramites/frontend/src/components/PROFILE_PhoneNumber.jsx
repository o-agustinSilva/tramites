import React, { useEffect } from 'react';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { MDBIcon, MDBInput, MDBBtn } from "mdb-react-ui-kit";

const PROFILE_PhoneNumber = () => {

  useEffect(() => {
    document.getElementById("cod-area").value = '2901';
    document.getElementById("telefono").value = '468686';
  }, []);

  return (
    <Container className="mt-5">
      <div id="editprofileMain" className="m-3">
        <Row className="mb-3">
          <Col md={6} className="d-flex justify-content-start align-items-center">
            <MDBIcon fas icon="mobile-alt" size="2x" />
            <h5 style={{ marginLeft: '6px' }}>Teléfono</h5>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={4} xl={2}>
            <MDBInput
              label="Código de área"
              id="cod-area"
              type="text"
              className="custom-input mb-3"
            />
          </Col>
          <Col xs={12} md={4} xl={4}>
            <MDBInput
              label="Número de teléfono"
              id="telefono"
              type="text"
              className="custom-input mb-3"
            />
          </Col>
          <Col xs={12} md={4} xl={6}>
            <div className="d-grid gap-2">
              <MDBBtn type="submit" color="success">
                Guardar cambios
              </MDBBtn>
            </div>
          </Col>
        </Row>

      </div>
    </Container>
  );
}

export default PROFILE_PhoneNumber;