import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MDBBtn } from "mdb-react-ui-kit";  
import { Link } from "react-router-dom";

export function TableTramites() {
  return (
    <Container>
      <h1>Mis Tramites</h1>
      <Row>
        <Col sm={12}>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Documento</th>
                  <th>Codigo</th>
                  <th>Dependencia</th>
                  <th>Fecha de Inicio</th>
                  <th>PDF</th>
                  <th>Comprobante</th>
                </tr>
              </thead>
              <tbody>
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
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
      
      <Link to='/dashboard'>
      <MDBBtn rounded className='mx-2' color='info'>
        Volver
      </MDBBtn>
      </Link>



    </Container>
  );
}

export default TableTramites;
