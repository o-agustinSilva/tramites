import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { MDBIcon, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import { toast } from "react-toastify";

const PROFILE_PhoneNumber = ({ user, onReload }) => {
  const [editar, setEditar] = useState(false);
  const [newCodigoArea, setNewCodigoArea] = useState("");
  const [newNumero, setNewNumero] = useState("");

  const handleEdit = () => {
    setEditar(true);
  };

  const handleSave = () => {
    //creo el objeto con los nuevos datos
    const newData = {
      ...user,
      phone_area_code: newCodigoArea,
      phone: newNumero,
    };

    //se envia la solicitud PACH para actualizar el numero de telefono
    axios
      .patch(
        `http://localhost:8000/api/update-phone-number/${user.id}/`,
        newData
      )
      .then((response) => {
        setEditar(false);
        toast.success('El numero telefonico se actualizo correctamente');
        setTimeout(()=>{
          onReload();
        },3000);
      })
      .catch((error) => {
        console.error("Error al actualizar el telefono ", error);
        toast.error('Error al actualizar el numero telefonico');
      });
  };

  return (
    <Container className="mt-5">
      <div id="editprofileMain" className="m-3">
        <Row className="mb-3">
          <Col
            md={6}
            className="d-flex justify-content-start align-items-center"
          >
            <MDBIcon fas icon="mobile-alt" size="2x" />
            <h5 style={{ marginLeft: "6px" }}>Teléfono</h5>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={4} xl={2}>
            <MDBInput
              label="Código de área"
              type="text"
              className="custom-input mb-3"
              value={user.phone_area_code}
            />
          </Col>
          <Col xs={12} md={4} xl={4}>
            <MDBInput
              label="Número de teléfono"
              id="telefono"
              type="text"
              className="custom-input mb-3"
              value={user.phone}
            />
          </Col>
          <Col xs={12} md={4} xl={6}>
            {!editar ? (
              <div className="d-grid gap-2">
                <MDBBtn type="submit" color="info" onClick={handleEdit}>
                  Cambiar Numero
                </MDBBtn>
              </div>
            ) : (
              <div className="d-grid gap-2">
                <MDBBtn type="submit" color="success" onClick={handleSave}>
                  Guardar cambios
                </MDBBtn>
              </div>
            )}
          </Col>

          {editar && (
            <Row>
              <Col xs={12} md={4} xl={2}>
                <MDBInput
                  label="Nuevo código de área"
                  type="text"
                  className="custom-input mb-3"
                  value={newCodigoArea}
                  onChange={(e) => setNewCodigoArea(e.target.value)}
                />
              </Col>

              <Col xs={12} md={4} xl={4}>
                <MDBInput
                  label="Nuevo número de teléfono"
                  type="text"
                  className="custom-input mb-3"
                  value={newNumero}
                  onChange={(e) => setNewNumero(e.target.value)}
                />
              </Col>
            </Row>
          )}
        </Row>
      </div>
    </Container>
  );
};

export default PROFILE_PhoneNumber;
