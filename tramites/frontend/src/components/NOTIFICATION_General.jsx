import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

function NOTIFICATION_General() {
  return (
    <Container className="mt-5">
      <div className="m-3">
        <Row>
          <Col>
            <h2>Nuevas Notificaciones</h2>
          </Col>
        </Row>

        
        <MDBTable hover>
      <MDBTableHead>
        <tr>
          <th scope='col'>Numero</th>
          <th scope='col'>Tipo</th>
          <th scope='col'>Solicitado Por:</th>
          <th scope='col'>Fecha de Ingreso</th>
          <th scope="col"></th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <th scope='row'>1</th>
          <td>Certificado de Domicilio</td>
          <td>Aguirre Agustin</td>
          <td>02/02/2024</td>
          <td>
              <MDBBtn className='me-1' color='warning'><MDBIcon fas icon="plus-circle" size="1.5x"  className="mx-2"/>
                    Añadir a Mis Tramites
              </MDBBtn>
          </td>
        </tr>
        <tr>
          <th scope='row'>2</th>
          <td>Certificado de Residencia</td>
          <td>Juan Perez</td>
          <td>05/01/2024</td>
          <td>
              <MDBBtn className='me-1' color='warning'><MDBIcon fas icon="plus-circle" size="1.5x" className="mx-2"/>
              Añadir a Mis Tramites
              </MDBBtn>
          </td>
        </tr>
       
      </MDBTableBody>
    </MDBTable>



      


      </div>
    </Container>
  );
}

export default NOTIFICATION_General;
