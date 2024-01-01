import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [codArea, setCodArea] = useState("");
  const [phone, setPhone] = useState("");
  const [formdata, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    document_type: "",
    genre: "",
    number: "",
    role: "citizen",
    birthdate: "",
    password: "",
    address: "",
    phone: "",
    password_confirmation: "",
  });

  const handleFormData = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formdata.phone = `${codArea}${phone}`;

    if (
      !formdata.email ||
      !formdata.lastname ||
      !formdata.password ||
      !formdata.password_confirmation
    ) {
      setError("Los campos son requeridos");
      return;
    }

    try {
      // Llamo a la API para intentar registrar el usuario
      const response = await axios.post(
        "http://localhost:8000/api/register/",
        formdata
      );
      const data = response.data;

      if (response.status === 201) {
        navigate('/otp/verify', { state: { email: formdata.email } }); // Redirijo a la pantalla de verificación de correo
        toast.success(data.message);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      if (error.response) {
        // La solicitud fue hecha y el servidor respondió con un estado de error
        console.error("Data de respuesta:", error.response.data);
        console.error("Estado de respuesta:", error.response.status);
        console.error("Encabezados de respuesta:", error.response.headers);
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error("Solicitud realizada pero no se recibió respuesta");
      } else {
        // Algo sucedió en la configuración de la solicitud que desencadenó un error
        console.error("Error de configuración de la solicitud:", error.message);
      }

    }
  };

  return (
    <div id="signup-container">
      <Container className="d-flex justify-content-center">
        <div id="signup-card" className="px-4">
          <Row>
            <Col
              md="12"
              className="d-flex justify-content-center text-align-center mt-2"
            >
              <h2 id="signup-title">Crea tu cuenta</h2>
            </Col>
          </Row>
          <form className="signup-form" onSubmit={handleSubmit}>
            <Row className="d-flex justify-content-center mt-4">
              <Col md="6" className="mb-3">
                <MDBInput
                  label="Nombre"
                  id="nombre"
                  type="text"
                  className="custom-input"
                  name="firstname"
                  value={formdata.firstname}
                  onChange={handleFormData}
                />
              </Col>
              <Col md="6" className="mb-3">
                <MDBInput
                  label="Apellido"
                  id="apellido"
                  type="text"
                  className="custom-input"
                  name="lastname"
                  value={formdata.lastname}
                  onChange={handleFormData}
                />
              </Col>
            </Row>

            <Row>
              <Col md="6" className="mb-3">
                <Form.Select
                  aria-label="Default select example"
                  name="document_type"
                  value={formdata.document_type}
                  onChange={handleFormData}
                >
                  <option value="" disabled>
                    Seleccione tipo de documento
                  </option>
                  <option value="DNI">DNI</option>
                  <option value="TWO">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Col>
              <Col md="6" className="mb-3">
                <MDBInput
                  label="Número"
                  id="dni"
                  type="text"
                  className="custom-input"
                  name="number"
                  value={formdata.number}
                  onChange={handleFormData}
                />
              </Col>
            </Row>

            <Row>
              <Col md="6" className="mb-3">
                <Form.Select
                  name="genre"
                  value={formdata.genre}
                  onChange={handleFormData}
                >
                  <option value="" disabled>
                    Género
                  </option>
                  <option value="male">Hombre</option>
                  <option value="female">Mujer</option>
                </Form.Select>
              </Col>
              <Col md="6" className="mb-3">
                <MDBInput
                  label="Fecha de nacimiento"
                  id="nacimiento"
                  type="date"
                  className="custom-input"
                  name="birthdate"
                  value={formdata.birthdate}
                  onChange={handleFormData}
                />
              </Col>
            </Row>

            <Row>
              <Col md="12" className="mb-3">
                <MDBInput
                  label="Dirección"
                  id="direccion"
                  type="text"
                  className="custom-input"
                  name="address"
                  value={formdata.address}
                  onChange={handleFormData}
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-3">
                <MDBInput
                  label="Código de área"
                  id="cod-area"
                  type="text"
                  className="custom-input"
                  onChange={(e) => setCodArea(e.target.value)}
                  value={codArea}
                />
              </Col>
              <Col md="6" className="mb-3">
                <MDBInput
                  label="Número de teléfono"
                  id="telefono"
                  type="text"
                  className="custom-input"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </Col>
            </Row>

            <Row>
              <Col md="12" className="mb-3">
                <MDBInput
                  label="Correo electrónico"
                  id="email"
                  type="text"
                  className="custom-input"
                  name="email"
                  value={formdata.email}
                  onChange={handleFormData}
                />
              </Col>
            </Row>

            <Row>
              <Col md="6" className="mb-3">
                <MDBInput
                  label="Contraseña"
                  id="password"
                  type="password"
                  className="custom-input"
                  name="password"
                  value={formdata.password}
                  onChange={handleFormData}
                />
              </Col>
              <Col md="6" className="mb-3">
                <MDBInput
                  label="Confirmar contraseña"
                  id="confirm-password"
                  type="password"
                  className="custom-input"
                  name="password_confirmation"
                  value={formdata.password_confirmation}
                  onChange={handleFormData}
                />
              </Col>
            </Row>
            
            <Row>
              <Col
                md={12}
                className="d-flex justify-content-center text-align-center mb-3"
              >
                <button type="submit" className="buttonPrimary">
                  Registrarse
                </button>
              </Col>
            </Row>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default SignUp;
