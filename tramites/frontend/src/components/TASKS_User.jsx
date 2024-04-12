import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import TASK_Details from "./TASK_Details";

function TASKS_User({ tramites, onVolver }) {
  const [showDetails, setShowDetails] = useState(true);
  const [caseId, setCaseId] = useState(null);

  // Permite renderizar componente que muestra detalles de un trámite
  const handleDetails = (id) => {
    setCaseId(id);
    setShowDetails(!showDetails);
  };

  const handleBack = () => {
    setShowDetails(true);
  }

  return (
    <Container fluid>
      {showDetails ? (
              <MDBTable hover responsive>
              <MDBTableHead>
                <tr>
                  <th scope="col">Numero</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Solicitante</th>
                  <th scope="col">Fecha de ingreso</th>
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
                      <th scope="col">
                        <MDBBtn color="info" onClick={() => handleDetails(tramite.id)}>
                          <MDBIcon far
                            icon="eye"
                            size="1.5x"
                            className="me-2"
                          />
                          Ver detalle
                          </MDBBtn>
                      </th>
                      <td>
                        <MDBBtn color="danger" onClick={() => onVolver(tramite.id)}>
                          <MDBIcon
                            fas
                            icon="minus-circle"
                            size="1.5x"
                            className="me-2"
                          />
                          Desasignar caso
                        </MDBBtn>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </MDBTableBody>
            </MDBTable>
      ) : (
        <TASK_Details id={caseId} onBack={handleBack} />
      )}

    </Container>
  );
}
export default TASKS_User;

