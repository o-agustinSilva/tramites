import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export function AdminUser() {
  return (
    <Container className="my-4 d-flex justify-content-center">
      <Row>
        <Col>
          <h1> Usuario Administador [nombre de usuario]</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminUser;
