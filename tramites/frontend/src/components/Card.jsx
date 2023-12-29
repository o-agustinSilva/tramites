import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";

export function Inicio() {
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

      <Row className="row-cols-1 row-cols-md-3 g-4">
        <Col>
          <div className="card h-100">
            <img
              src="../../src/img/logocard.jpg"
              className="card-img-top"
              alt="imagen card"
            />
            <div className="card-body">
              <h5 className="card-title">Certificado de residencia</h5>
              <p className="card-text">
                El certificado de residencia tiene el propósito de validar y
                comprobar la dirección de domicilio de una persona en el ámbito
                legal y administrativo. La información proporcionada en el
                certificado puede ser utilizada en diversos trámites y
                procedimientos legales, así como para acceder a ciertos
                servicios públicos o privados que requieran verificar la
                residencia de una persona.
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

        <Col>
          <div className="card h-100">
            <img
              src="../../src/img/logocard.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Certificado de Buena Conducta</h5>
              <p className="card-text">
                El certificado de buena conducta es un documento expedido por
                autoridades policiales que certifica que la persona solicitante
                no tiene antecedentes penales o registra alguna condena
                judicial. Este certificado es utilizado en diversas situaciones
                y trámites donde se requiere demostrar la ausencia de
                antecedentes penales, ya sea para acceder a ciertos empleos,
                realizar trámites administrativos, obtener visas para viajar al
                exterior, entre otros.
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

        <Col>
          <div className="card h-100">
            <img
              src="../../src/img/logocard.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Certificado de Residencia</h5>
              <p className="card-text">
                El certificado de reincidencia es un documento oficial que
                certifica si una persona tiene antecedentes penales por haber
                cometido delitos anteriormente. Este certificado es emitido por
                la Policía Federal Argentina y se utiliza para verificar si una
                persona ha sido condenada anteriormente por la comisión de algún
                delito. La información que proporciona este certificado abarca
                tanto delitos menores como delitos más graves.
              </p>
            </div>
            <div className="card-footer">
              <a
                href="https://www.dnrec.jus.gov.ar/InicioTramite/IniciarSolicitud.aspx"
                target="_blank"
              >
                <button type="button" className="btn btn-info">
                  Solicitar
                </button>
              </a>
            </div>
          </div>
        </Col>

        <Col>
          <div className="card h-100">
            <img
              src="../../src/img/logocard.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Certificado de Extravio</h5>
              <p className="card-text">
                El certificado de extravío es un documento oficial que se emite
                para declarar la pérdida o extravío de un objeto o documento.
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

        <Col>
          <div className="card h-100">
            <img
              src="../../src/img/logocard.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Certificado de Domicilio</h5>
              <p className="card-text">
                El certificado de domicilio es un documento oficial que acredita
                el lugar de residencia habitual de una persona en un momento
                específico. .
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
    </Container>
  );
}

export default Inicio;
