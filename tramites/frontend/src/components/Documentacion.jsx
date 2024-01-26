import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MDBIcon } from "mdb-react-ui-kit";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export function Documentacion() {
  return (
    <div>
      <Container className="my-5">
          <Col>
            <div className="d-flex flex-row">
              <MDBIcon fas icon="id-card" size="3x" />
              <h3 id="h3Doc">
                Fotos del Documento (Tome una imagen del frente y dorso)
              </h3>
            </div>
          </Col>

          <Row className="my-5">
            <Col sm={12} xl={6}>
              <form className="was-validated">
                <label className="labelRequest"> Frente: </label>
                <div className="mb-3">
                  <input
                    type="file"
                    className="inputRequest form-control"
                    aria-label="file example"
                    required
                  />
                </div>
              </form>
            </Col>

            <Col sm={12} xl={6}>
              <form className="was-validated">
                <label className="labelRequest"> Dorso: </label>
                <div className="mb-3">
                  <input
                    type="file"
                    className="inputRequest form-control"
                    aria-label="file example"
                    required
                  />
                </div>
              </form>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="d-flex flex-row">
                <MDBIcon fas icon="file-alt" size="3x" />
                <h3 id="h3Doc">
                  Documentacion Adicional (Solo en caso de que se requiera)
                </h3>
              </div>
            </Col>

            <Row>
              <Col sm={12} xl={6} className="my-4">
                <form className="was-validated">
                  <label className="labelRequest"> Documentacion: </label>
                  <div className="mb-3">
                    <input
                      type="file"
                      className="inputRequest form-control"
                      aria-label="file example"
                      required
                    />
                  </div>
                </form>
              </Col>
            </Row>

            <Row>
              <Col sm={8} xl={6} className="my-2">
                <Link to="/">
                  <MDBBtn toggle >
                    <MDBIcon fas icon="home" className="mx-2 btDoc" size="2x" />
                    Inicio
                  </MDBBtn>
                </Link>
              </Col>
              <Col sm={8} xl={6}className="my-2">
                <Link to="/pago">
                  <MDBBtn color="info">  <MDBIcon fas icon="file-contract" className=" mx-2 btDoc" size="3x" />
                    Generar Certificado
                  </MDBBtn>
                </Link>
              </Col>
            </Row>
          </Row>

      </Container>
    </div>
  );
}

export default Documentacion;
