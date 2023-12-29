import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MDBBtn } from "mdb-react-ui-kit";
import { MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export function PagoTramite() {
  return (
    <Container className=" my-4">
      <Row id="infoTramite">
        <Col>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Documento</th>
                <th scope="col">Precio</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr>
                <td>Certificado de [nombre ]</td>
                <td>$ 800</td>
              </tr>
              <tr>
                <td colspan="1">Total</td>
                <td>$ 800</td>
              </tr>
            </tbody>
          </table>
        </Col>

        <Row>
          <Col
            sm={12}
            xl={6}
            className="my-4 d-flex justify-content-center"
          >
            <Link to='/'>
              <MDBBtn>
                <MDBIcon fas icon="home" className="mx-2 btDoc" size='2x' /> Voler
              </MDBBtn>
            </Link>
          </Col>

          <Col className="my-4 mx-2">
            <MDBBtn color="success">
              <MDBIcon fas icon="thumbs-up" className="mx-2 btDoc" size='2x'/>
              Confirmar
            </MDBBtn>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export default PagoTramite;
