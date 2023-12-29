import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function MercadoPago() {
  return (
    <Container fluid className=" my-4">
      <Row>
        <Col xl={2} sm={2}  className="d-flex justify-content-star">
          <img src="../../src/img/mercadopago.jpg" className="imgPago" />
        </Col>
        <Col xl={8} sm={8} className="d-flex justify-content-center">
          <h1 className="h1Pago"> Sistema de Pago </h1>
        </Col>

        <Col xl={2} sm={2} className="d-flex justify-content-end">
           <img src="../../src/img/logo.jpg" className="imgLogo" />
        </Col>
      </Row>
    </Container>
  );
}

export default MercadoPago;
