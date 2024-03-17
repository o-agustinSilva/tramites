import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import axios from "axios";

function TASKS_User({tramites, onVolver}) {
  
 
  return (
    <Container className="mt-5">
      <div className="my-3">
        <Row>
          <Col>
            <h2>MIS TAREAS</h2>
          </Col>
        </Row>
      </div>

      <MDBTable hover>
        <MDBTableHead>
          <tr>
            <th scope="col">Numero</th>
            <th scope="col">Tipo</th>
            <th scope="col">Solicitado Por:</th>
            <th scope="col">Fecha de Ingreso</th>
            <th scope="col">Estado</th>
            <th scope="col"></th>
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
                <th scope="col">
                <MDBIcon fas icon="file-import" size="2x"
                      className="mx-2" title="Ver Docuementacion" />

                </th>
                <td>
                  <MDBBtn
                    className="me-1"
                    color="warning"
                    onClick={() => onVolver(tramite.id)}
                  >
                    <MDBIcon
                      fas
                      icon="plus-circle"
                      size="1.5x"
                      className="mx-2"
                    />
                    Volver
                  </MDBBtn>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </MDBTableBody>{" "}
      </MDBTable>
    </Container>
  );
}
export default TASKS_User;

