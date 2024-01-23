import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function PROFILE_Image() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Container fluid>
      <div>
        <Row className="d-flex mt-3">
          <Col xs={12} md={6} className="d-flex justify-content-center align-items-center">
            <img
              id="profileImg"
              src="../../src/img/LA BESTIA.jpg"
              alt="Imagen de perfil"
            />
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-center align-items-center text-align-center">
            {user && <h3 id="profileName">{user.fullname}</h3>}
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default PROFILE_Image;
