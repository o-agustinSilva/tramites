import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function ProfileImage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Container>
      <div>
        <Row id="profileMain" className="d-flex m-3">
          <Col xs={12} md={2} className="d-flex justify-content-center align-items-center">
            <img
              id="profileImg"
              src="../../src/img/LA BESTIA.jpg"
              alt="Imagen de perfil"
            />
          </Col>
          <Col xs={12} md={3} className="d-flex justify-content-center align-items-center text-align-center">
            {user && <h3 id="profileName">{user.fullname}</h3>}
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default ProfileImage;
