import Container from "react-bootstrap/esm/Container";
import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

function NOTIFICATION_General({tramites, onAddTramite}) {
 
  return (
    <Container fluid>
        <MDBTable hover responsive>
          <MDBTableHead>
            <tr>
              <th scope="col">Numero</th>
              <th scope="col">Tipo</th>
              <th scope="col">Solicitante</th>
              <th scope="col">Fecha de ingreso</th>
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
                      Reclamar caso
                    </MDBBtn>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </MDBTableBody>
        </MDBTable>
    </Container>
  );
}

export default NOTIFICATION_General;

