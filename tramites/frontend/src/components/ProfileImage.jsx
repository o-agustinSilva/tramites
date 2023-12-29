import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function ProfileImage() {
  return (
    <Container fluid className="d-flex justify-content-center">
      <div className="profileContainer">
        <Row>
          <Col xs={12} className="d-flex justify-content-center">
            <img
              id="profileImg"
              src="../../src/img/LA BESTIA.jpg"
              alt="Imagen de perfil"
            />
          </Col>
          <Col
            xs={12}
            className="d-flex align-items-center justify-content-center"
          >
            <h1 id="profileName">Miguel Merentiel</h1>
          </Col>
          
        </Row>
      </div>
      
    </Container>
  );
}

export default ProfileImage;
