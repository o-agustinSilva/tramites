import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { MDBIcon, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import { toast } from "react-toastify";

const PROFILE_Adress = ({ user, onReload }) => {
  const [editar, setEditar] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [newAddressNumber, setNewAddressNumber] = useState("");
  const [newFloor, setNewFloor] = useState("");
  const [newApartement, setNewApartament] = useState("");

  const handleEdit = () => {
    setEditar(true);
  };

  const handleSave = () => {
    //creo el objeto con los nuevos datos
    const newData = {
      ...user,
      address: newAddress,
      address_number: newAddressNumber,
      floor: newFloor,
      apartement: newApartement,
    };

    //se envia la solicitud PACH para actualizar la direccion
    axios
      .patch(
        `http://localhost:8000/api/update-address/${user.id}/`,
        newData
      )
      .then((response) => {
        setEditar(false);
        toast.success('La dirección se actualizo correctamente');
        setTimeout(()=>{
          onReload();
        },3000);
      })
      .catch((error) => {
        console.error("Error al actualizar su dirección ", error);
        toast.error('Error al actualizar su dirección');
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
            <MDBIcon fas icon="home" size="2x" />
            <h5 style={{ marginLeft: "6px" }}>Direccion </h5>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={4} xl={6}>
            <MDBInput
              label="calle"
              type="text"
              className="custom-input mb-3"
              value={user.address}
            />
          </Col>
          <Col xs={12} md={4} xl={2}>
            <MDBInput
              label="direccion-numero"
              id="direccion"
              type="text"
              className="custom-input mb-3"
              value={user.address_number}
            />
          </Col>

          <Col xs={12} md={4} xl={2}>
            <MDBInput
              label="edifio"
              id="edificio"
              type="text"
              className="custom-input mb-3"
              value={user.floor}
            />
          </Col>
          
          <Col xs={12} md={4} xl={2}>
            <MDBInput
              label="departamento"
              id="departamento"
              type="text"
              className="custom-input mb-3"
              value={user.apartment}
            />
          </Col>
          <Col xs={12} md={4} xl={6}></Col>

          <Col xs={12} md={4} xl={6}>
            {!editar ? (
              <div className="d-grid gap-2" >
                <MDBBtn type="submit" color="info" onClick={handleEdit}>
                  Cambiar Dirección
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
            <Row className="my-3 mx-1" >
              <Col xs={12} md={4} xl={6}>
                <MDBInput
                  label="Nueva Calle"
                  type="text"
                  className="custom-input mb-3"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                />
              </Col>

              <Col xs={12} md={4} xl={2}>
                <MDBInput
                  label="Nuevo Numero"
                  type="text"
                  className="custom-input mb-3"
                  value={newAddressNumber}
                  onChange={(e) => setNewAddressNumber(e.target.value)}
                />
              </Col>
              <Col xs={12} md={4} xl={2}>
                <MDBInput
                  label="Nuevo Edificio"
                  type="text"
                  className="custom-input mb-3"
                  value={newFloor}
                  onChange={(e) => setNewFloor(e.target.value)}
                />
              </Col>
              
              <Col xs={12} md={4} xl={2}>
                <MDBInput
                  label="Nuevo Dpto"
                  type="text"
                  className="custom-input mb-3"
                  value={newApartement}
                  onChange={(e) => setNewApartament(e.target.value)}
                />
              </Col>

            </Row>
          )}
        </Row>
      </div>
    </Container>
  );
};

export default PROFILE_Adress;
