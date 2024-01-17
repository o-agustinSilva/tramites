import React from 'react'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { MDBIcon, MDBInput, MDBBtn } from "mdb-react-ui-kit";

const PROFILE_Email = () => {

    return(
    <Container className="mt-5">
      <div id="editprofileMain" className="m-3">

        <Row className="mb-3">
          <Col md={6} className="d-flex justify-content-start align-items-center">
          <MDBIcon fas icon="at" size='2x'/>
            <h5 style={{ marginLeft: '6px' }}>Correo electrónico</h5>
          </Col>
        </Row>

        <Row>
          <Col md={8} xl={6}>
            <MDBInput
              label="Correo electrónico"
              id="email"
              type="text"
              className="custom-input mb-3"
            />
          </Col>
          <Col md={4} xl={6}>
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

export default PROFILE_Email