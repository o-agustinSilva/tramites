import React from "react";
import Row from "react-bootstrap/Container";
import Col from "react-bootstrap/Container";
import Container from "react-bootstrap/Container";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export function TableTramites() {
  return (
    <Container className="mt-5">
      <h3>Mis trámites</h3>
      <div className="table-responsive">
        <MDBTable hover className="table">
          <MDBTableHead>
            <tr className="table-header">
              <th scope="col">Documento</th>
              <th scope="col">Codigo</th>
              <th scope="col">Dependencia</th>
              <th scope="col">Fecha de Inicio</th>
              <th scope="col">PDF</th>
              <th scope="col">Comprobante</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            <tr>
              <td>Certificado de Recidencia</td>
              <td>025</td>
              <td>Investigaciones</td>
              <td>25/01/2023</td>
              <td>PDF</td>
              <td>COMPROBANTE</td>
            </tr>
            <tr>
              <td>Certificado de Domicilio</td>
              <td>040</td>
              <td>Comisaria 1ra</td>
              <td>08/04/2023</td>
              <td>PDF</td>
              <td>COMPROBANTE</td>
            </tr>
            <tr>
              <td>Certificado de Extravio</td>
              <td>280</td>
              <td>Comisaria 3ra</td>
              <td>04/04/2023</td>
              <td>PDF</td>
              <td>COMPROBANTE</td>
            </tr>
          </MDBTableBody>
        </MDBTable>
      </div>

      <Row className="mt-3">
        <Col>
          <Link to='/dashboard'>
            <MDBBtn rounded className='mx-2' color='info'>
              Volver
            </MDBBtn>
          </Link>
        </Col>
      </Row>



    </Container>
  );
}

export default TableTramites;
