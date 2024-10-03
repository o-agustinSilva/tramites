import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    number: "",
    genre: "",
    address: "",
    address_number: "",
    floor: "",
    apartment: "",
    role: "citizen",
    birthdate: "",
    password: "",
    phone: "",
    phone_area_code: "",
    password_confirmation: "",
  });



  useEffect(() => {
    toast.info("Para registrarse en el sistema debe ser mayor de 18 años.", {
      position: "top-center",
      autoClose: 9000,});
  }, [])


  const handleFormData = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);


    const requiredFields = [
      "email",
      "firstname",
      "lastname",
      "document_type",
      "number",
      "genre",
      "address",
      "address_number",
      "birthdate",
      "password",
      "password_confirmation",
    ];

    for (const field of requiredFields) {
      if (!formdata[field]) {
        toast.error("Todos los campos son requeridos.");
        return;
      }
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
    <Container className="d-flex justify-content-center">
      <div id="signup-card" className="p-4 m-5">
        <Row>
          <Col
            md="12"
            className="d-flex justify-content-center text-align-center">
            <h2 style={{ color: "black" }}>Registrarse</h2>
          </Col>
        </Row>

        <form onSubmit={handleSubmit}>
          <Row className="d-flex justify-content-center mt-4">
            <Col md={12}>
              <h6>Datos personales</h6>
              <hr style={{ color: "black" }} />
            </Col>
            <Col md={6} className="mb-3">
              <MDBInput
                label="Nombre"
                id="nombre"
                type="text"
                className="custom-input"
                name="firstname"
                value={formdata.firstname}
                onChange={handleFormData}
                required
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
                name="document_type"
                value={formdata.document_type}
                onChange={handleFormData}
              >
                <option value="" disabled>
                  Seleccione tipo de documento
                </option>
                <option value="DNI">DNI</option>
                <option value="TWO">PASAPORTE</option>
              </Form.Select>
            </Col>

            <Col md="6" className="mb-3">
              <MDBInput
                label="Número"
                id="dni"
                type="number"
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
            <Col md={12}>
              <h6>Domicilio</h6>
              <hr style={{ color: "black" }} />
            </Col>
            <Col md="4" className="mb-3">
              <MDBInput
                label="Calle"
                type="text"
                className="custom-input"
                name="address"
                value={formdata.address}
                onChange={handleFormData}
              />
            </Col>
            <Col md="2" className="mb-3">
              <MDBInput
                label="N°"
                type="number"
                className="custom-input"
                name="address_number"
                value={formdata.address_number}
                onChange={handleFormData}
              />
            </Col>
            <Col md="3" className="mb-3">
              <MDBInput
                label="Piso"
                type="number"
                className="custom-input"
                name="floor"
                value={formdata.floor}
                onChange={handleFormData}
              />
            </Col>
            <Col md="3" className="mb-3">
              <MDBInput
                label="Departamento"
                type="text"
                className="custom-input"
                name="apartment"
                value={formdata.apartment}
                onChange={handleFormData}
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <h6>Datos de contacto</h6>
              <hr style={{ color: "black" }} />
            </Col>
            <Col md="12" className="mb-3">
              <MDBInput
                label="Correo electrónico"
                id="email"
                type="email"
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
                label="Código de área"
                type="number"
                className="custom-input"
                name="phone_area_code"
                value={formdata.phone_area_code}
                onChange={handleFormData}
              />
            </Col>
            <Col md="6" className="mb-3">
              <MDBInput
                label="Número de teléfono"
                id="telefono"
                type="number"
                className="custom-input"
                name="phone"
                value={formdata.phone}
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

          <Row className="d-flex mt-3">
            <div className="d-grid gap-2">
              <MDBBtn type="submit" color="success">
                Registrarse
              </MDBBtn>
            </div>
          </Row>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;
