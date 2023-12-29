import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MDBIcon } from "mdb-react-ui-kit";

export function InfoTramite() {
  return (
    <div>
      <Container fluid>
        <Row className="my-5">
          <Col className="bg-dark.bg-gradient d-flex justify-content-center">
            <h1>Solicitud de certificado de [Nombre]</h1>
          </Col>
        </Row>

        <Row id="infoTramite">
          <Col xs={12}>
            <h1>¿Qué es el [nombre certificado]?</h1>
          </Col>
          <Col xs={12}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Col>

          <Col xs={12}>
            <h1>¿Cuáles son los requisitos?</h1>
          </Col>
          <Col xs={12}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Col>

          <Col xs={12}>
            <h1>¿Cuáles son los medios de pago?</h1>
          </Col>
          <Col xs={12}>
            <p>
              El trámite se abona mediante la plataforma Mercado Pago y se
              aceptan los siguientes medios:{" "}
            </p>
            <p>
              Tarjeta de Debito: <MDBIcon fab icon="cc-visa" size="2x" />{" "}
              <MDBIcon fab icon="cc-mastercard" size="2x" />
            </p>
            <p>
              Tarjeta de Credito: <MDBIcon fab icon="cc-visa" size="2x" />{" "}
              <MDBIcon fab icon="cc-mastercard" size="2x" />
            </p>
          </Col>
        </Row>  
      </Container>
    </div>
  );
}

export default InfoTramite;
