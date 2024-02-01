import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MDBFile, MDBIcon } from "mdb-react-ui-kit";

export function PROFILE_Image() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Container fluid >
      <div id="editprofileMain" className="m-3">
        <Row className="mb-3">
          <Col md={12} className="d-flex justify-content-start align-items-center">
            <MDBIcon fas icon="user-edit" size="2x" />
            <h5 style={{ marginLeft: "6px" }}>Imágen de perfil</h5>
          </Col>
        </Row>
        <Row className="d-flex mt-3">
          <Col xs={12} md={6} className="d-flex justify-content-center align-items-center">
            <img
              id="profileImg"
              src="../../src/img/LA BESTIA.jpg"
              alt="Imagen de perfil"
            />
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-center align-items-center text-align-center">
            <Row>
              <Col>
                <MDBFile label="Seleccione nueva imágen" id='customFile' />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default PROFILE_Image;
