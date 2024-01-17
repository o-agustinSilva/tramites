import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import { Carousel, CarouselItem } from "react-bootstrap";

export function Inicio2() {
  return (
    <Container className="my-4">
      <Row className="my-5">
        <Col className="d-flex justify-content-center">
          <h2>Trámites Online</h2>
        </Col>
      </Row>

      <Row className="my-5">
        <Col xl={12}>
          <div className="linea"></div>
        </Col>
      </Row>

      <Row>
  <Carousel>
    <CarouselItem>
      <Row>
        <Col xl={4} sm={4} className="d-flex justify-content-center">
        <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Certificado de residencia</h5>
              <p className="card-text">
                El certificado de residencia tiene el propósito de validar y
                comprobar la dirección de domicilio de una persona en el ámbito
                legal y administrativo.
              </p>
            </div>
            <div className="card-footer">
              <Link to="/requestTramite">
                <button type="button" className="btn btn-info">
                  Solicitar
                </button>
              </Link>
            </div>
          </div>
        </Col>

        <Col xl={4} sm={4} className="d-flex justify-content-center">
        <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Certificado de residencia</h5>
              <p className="card-text">
                El certificado de residencia tiene el propósito de validar y
                comprobar la dirección de domicilio de una persona en el ámbito
                legal y administrativo.
              </p>
            </div>
            <div className="card-footer">
              <Link to="/requestTramite">
                <button type="button" className="btn btn-info">
                  Solicitar
                </button>
              </Link>
            </div>
          </div>
        </Col>

        <Col xl={4} sm={4} className="d-flex justify-content-center">
        <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Certificado de residencia</h5>
              <p className="card-text">
                El certificado de residencia tiene el propósito de validar y
                comprobar la dirección de domicilio de una persona en el ámbito
                legal y administrativo.
              </p>
            </div>
            <div className="card-footer">
              <Link to="/requestTramite">
                <button type="button" className="btn btn-info">
                  Solicitar
                </button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </CarouselItem>

    <CarouselItem>
      <Row>
      <Col xl={4} sm={4} className="d-flex justify-content-center">
        <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Certificado de residencia</h5>
              <p className="card-text">
                El certificado de residencia tiene el propósito de validar y
                comprobar la dirección de domicilio de una persona en el ámbito
                legal y administrativo.
              </p>
            </div>
            <div className="card-footer">
              <Link to="/requestTramite">
                <button type="button" className="btn btn-info">
                  Solicitar
                </button>
              </Link>
            </div>
          </div>
        </Col>

        <Col xl={4} sm={4} className="d-flex justify-content-center">
        <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Certificado de residencia</h5>
              <p className="card-text">
                El certificado de residencia tiene el propósito de validar y
                comprobar la dirección de domicilio de una persona en el ámbito
                legal y administrativo.
              </p>
            </div>
            <div className="card-footer">
              <Link to="/requestTramite">
                <button type="button" className="btn btn-info">
                  Solicitar
                </button>
              </Link>
            </div>
          </div>
        </Col>

        <Col xl={4} sm={4} className="d-flex justify-content-center">
        <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Certificado de residencia</h5>
              <p className="card-text">
                El certificado de residencia tiene el propósito de validar y
                comprobar la dirección de domicilio de una persona en el ámbito
                legal y administrativo.
              </p>
            </div>
            <div className="card-footer">
              <Link to="/requestTramite">
                <button type="button" className="btn btn-info">
                  Solicitar
                </button>
              </Link>
            </div>
          </div>
        </Col>

      </Row>
    </CarouselItem>

  
  </Carousel>
</Row>
    </Container>
  );
}

export default Inicio2;
