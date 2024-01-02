import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function ProfileImage() {
  const user = JSON.parse(localStorage.getItem("user"));

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
            {user && <h1 id="profileName">{user.fullname}</h1>}
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default ProfileImage;
