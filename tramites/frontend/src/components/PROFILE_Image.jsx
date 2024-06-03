import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MDBFile, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export function PROFILE_Image({ user, onReload }) {
  const [newImage, setNewImage] = useState("");

  const handleEditImagen = () => {
    const formData = new FormData();
    formData.append("profile_imagen", newImage);

    axios
      .patch(
        `http://localhost:8000/api/update-perfil-imag/${user.id}/`,
        formData
      )
      .then((response) => {
        toast.success("La imagen se actualizo correctamente");
        // Retrasar la recarga de la página para que se vea el mensaje
        setTimeout(() => {
          onReload();
        }, 3000); // 3000 milisegundos = 3 segundos
      })
      .catch((error) => {
        console.error("Error al modificar la imagen", error);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  return (
    <Container fluid>
      <div id="editprofileMain" className="m-3">
        <Row className="mb-3">
          <Col
            md={12}
            className="d-flex justify-content-start align-items-center"
          >
            <MDBIcon fas icon="user-edit" size="2x" />
            <h5 style={{ marginLeft: "6px" }}>Imágen de perfil</h5>
          </Col>
        </Row>
        <Row className="d-flex mt-3">
          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            {user.profile_imagen ? (
              <img
                style={{ width: "150px", height: "150px" }}
                id="profileImg"
                src={user?.profile_imagen}
                alt="Imagen de perfil"
              />
            ) : (
              <MDBIcon fas icon="user" size="4x" />
            )}
          </Col>
          <Col
            xs={12}
            md={6}
            className="d-flex flex-column justify-content-center align-items-center text-align-center"
          >
            <Row>
              <Col>
                <MDBFile
                  label="Seleccione nueva imágen"
                  id="customFile"
                  onChange={handleFileChange}
                />
              </Col>
            </Row>

            <Row>
              <Col className="d-flex justify-content-center my-3 ">
                <MDBBtn color="info" onClick={handleEditImagen}>
                  Cambiar Imagen
                </MDBBtn>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default PROFILE_Image;
