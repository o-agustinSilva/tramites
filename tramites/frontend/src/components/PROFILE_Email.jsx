import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { MDBIcon, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PROFILE_Email = ({ user }) => {
  const [editar, setEditar] = useState(false);
  const [newCorreo, setNewCorreo] = useState("");
  const [emailError, setEmailError] = useState("");


  const validarEmail = (email)=>{
    //expresion para validar un correo
    const re = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    return re.test(String(email).toLowerCase());
  }

  const navigate = useNavigate();

  const handleEdit = () => {
    setEditar(true);
  };


  const handleSave = () => {
    if (!validarEmail(newCorreo)) {
      setEmailError("Por favor, ingrese un correo electrónico válido");
      return;
    }

    setEmailError(""); // Limpiar cualquier error previo si la validación pasa
    

    
    //creo el objeto con los nuevos datos
    const newData = {
      ...user,
      email: newCorreo,
    };

    //se envia la solicitud PACH para actualizar el numero de telefono
    axios
      .patch(`http://localhost:8000/api/update-email/${user.id}/`, newData)
      .then((response) => {
        setEditar(false);
        toast.success(
          "El correo se actualizó correctamente! Recuerde que debe actualizar su contraseña"
        );
        setTimeout(() => {
          //envia al usuario al login
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        if (error.response.status == 400) {
          toast.error("Ya existe un usuario con esta direccion de correo");
        }
        console.error(error);
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
            <MDBIcon fas icon="at" size="2x" />
            <h5 style={{ marginLeft: "6px" }}>Correo electrónico</h5>
          </Col>
        </Row>

        <Row>
          <Col md={8} xl={6}>
            <MDBInput
              label="Correo electrónico"
              id="email"
              type="text"
              className="custom-input mb-3"
              value={user.email}
            />
          </Col>

          <Col md={4} xl={6}>
            {!editar ? (
              <div className="d-grid gap-2">
                <MDBBtn type="submit" color="info" onClick={handleEdit}>
                  Cambiar Correo
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
            <Col md={8} xl={6}>
              <MDBInput
                label="Nuevo Correo electrónico"
                id="email"
                type="email"
                className="custom-input mb-3"
                value={newCorreo}
                onChange={(e) => setNewCorreo(e.target.value)}    
              />
              {emailError && <div style={{ color: 'red', marginBottom: '10px' }}>{emailError}</div>}
            </Col>
          )}
        </Row>
      </div>
    </Container>
  );
};

export default PROFILE_Email;
