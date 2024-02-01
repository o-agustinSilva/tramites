import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import {
  MDBAccordion,
  MDBAccordionItem,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

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
        <MDBAccordion borderless initialActive={1}>
          <MDBAccordionItem
            collapseId={1}
            headerTitle="Certificado de Extravio"
          >
            El certificado de extravío es un documento oficial que se emite para
            declarar la pérdida o extravío de un objeto o documento.
            <div className="my-3">
              <Link to="/requestTramite">
                <MDBBtn className="d-flex align-items-center" color="info">
                  {" "}
                  <MDBIcon
                    fas
                    icon="file-signature"
                    size="2x"
                    style={{ marginRight: "10px" }}
                  />
                  <span className="mb-0">Iniciar Tramite</span>
                </MDBBtn>
              </Link>
            </div>
          </MDBAccordionItem>
          <MDBAccordionItem
            collapseId={2}
            headerTitle="Certificado de Residencia"
          >
            El certificado de reincidencia es un documento oficial que certifica
            si una persona tiene antecedentes penales por haber cometido delitos
            anteriormente.
            <div className="my-3">
              <Link to="/requestTramite">
                <MDBBtn className="d-flex align-items-center" color="info">
                  {" "}
                  <MDBIcon
                    fas
                    icon="file-signature"
                    size="2x"
                    style={{ marginRight: "10px" }}
                  />
                  <span className="mb-0">Iniciar Tramite</span>
                </MDBBtn>
              </Link>
            </div>
          </MDBAccordionItem>
          <MDBAccordionItem
            collapseId={3}
            headerTitle="Certificado de Buena Conducta"
          >
            El certificado de buena conducta es un documento expedido por
            autoridades policiales que certifica que la persona solicitante no
            tiene antecedentes penales o registra alguna condena judicial.
            <div className="my-3">
              <Link to="/requestTramite">
                <MDBBtn className="d-flex align-items-center" color="info">
                  {" "}
                  <MDBIcon
                    fas
                    icon="file-signature"
                    size="2x"
                    style={{ marginRight: "10px" }}
                  />
                  <span className="mb-0">Iniciar Tramite</span>
                </MDBBtn>
              </Link>
            </div>
          </MDBAccordionItem>
        </MDBAccordion>
      </Row>
    </Container>
  );
}

export default Inicio2;
