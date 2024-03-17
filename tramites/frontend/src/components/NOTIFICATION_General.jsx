import Container from "react-bootstrap/esm/Container";
import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

function NOTIFICATION_General({tramites, onAddTramite}) {
 
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
              <th scope="col">Numero</th>
              <th scope="col">Tipo</th>
              <th scope="col">Solicitado Por:</th>
              <th scope="col">Fecha de Ingreso</th>
              <th scope="col">Estado</th>
              <th scope="col"></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {tramites.map((tramite) => (
              <React.Fragment key={tramite.id}>
                <tr>
                  <th scope="row">{tramite.id}</th>
                  <td>{tramite.tramite.name}</td>
                  <td>{tramite.solicitante.firstname}</td>
                  <td>{tramite.request_date}</td>
                  <td>{tramite.status}</td>
                  <td>
                    <MDBBtn
                      className="me-1"
                      color="success"
                      onClick={() => onAddTramite(tramite.id)}
                    >
                      <MDBIcon
                        fas
                        icon="plus-circle"
                        size="1.5x"
                        className="mx-2"
                      />
                      Añadir a Mis Tramites
                    </MDBBtn>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </Container>
  );
}

export default NOTIFICATION_General;

