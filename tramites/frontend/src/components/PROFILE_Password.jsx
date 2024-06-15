import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { MDBIcon, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PROFILE_Password = ({user}) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const validarPassword = (newPassword) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);

    if (newPassword.length < minLength) {
      toast.error("La contraseña de contener como minimo 8 caracteres");
    }

    if (!hasUpperCase) {
      toast.error("La contraseña de contener como minimo una Mayuscula");
    }

    if (!hasNumber) {
      toast.error("La contraseña de contener como minimo un numero");
    }
    return "";
  };


  const handleSavePassword = () => {
    if (password === newPassword) {
      validarPassword(newPassword);
      //creo el objeto con los nuevos datos
      const newData = {
        ...user,
        password: newPassword,
      };
  

      //se envia la solicitud PACH para actualizar el numero de telefono
      axios
        .patch(`http://localhost:8000/api/update-password/${user.id}/`, newData)
        .then((response) => {
          console.log(response.data);
          toast.success("La contraseña se actualizo correctamente");
            setTimeout(() => {
          //envia al usuario al login
          navigate("/login");
           }, 3000);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      toast.error("Las contraseñas no coinciden");
      setNewPassword("");
      setPassword("");
    }
  };

  return (
    <Container className="mt-4">
      <div id="editprofileMain" className="m-3">
        <Row className="mb-3">
          <Col
            md={6}
            className="d-flex justify-content-start align-items-center"
          >
            <MDBIcon fas icon="key" size="2x" />
            <h5 style={{ marginLeft: "6px" }}>Datos de acceso</h5>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p>
              Modifica esta sección unicamente si quieres cambiar tu contraseña
            </p>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={4} xl={3}>
            <MDBInput
              label="Nueva contraseña"
              id="new_password"
              type="text"
              className="custom-input mb-3"
              value={password}
              onChange={handlePassword}
            />
          </Col>
          <Col xs={12} md={4} xl={3}>
            <MDBInput
              label="Confirmar contraseña"
              id="confirm_password"
              type="text"
              className="custom-input mb-3"
              value={newPassword}
              onChange={handleNewPassword}
            />
          </Col>
          <Col xs={12} md={4} xl={6}>
            <div className="d-grid gap-2">
              <MDBBtn
                type="submit"
                color="success"
                onClick={handleSavePassword}
              >
                Cambiar contraseña
              </MDBBtn>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4} xl={8}>
            <div>Por su seguridad: </div>
            <ul>
              <li>La contraseña debe contener como minimo 8 caracteres</li>
              <li>La contraseña debe contener como minimo una Mayuscula</li>
              <li>La contraseña debe contener como minimo un numero</li>
            </ul>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default PROFILE_Password;
