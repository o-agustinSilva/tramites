import React, { useState, useEffect } from 'react';
import { useTramite } from '../context/TramiteProvider';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {
  MDBInput,
  MDBInputGroup,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

const REQTRAMITE_FirstStep = (props) => {
  const { tramiteData, setTramiteData } = useTramite();
  const user = JSON.parse(localStorage.getItem("user_data"));
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    document_type: '',
    number: '',
    address: '',
    address_number: '',
    floor: '',
    email: '',
    phone: '',
    birthdate: '',
  });

  useEffect(() => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      ...user,
      phone: user.phone_area_code + user.phone,
    }));
  }, []);

  const handleFormData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    setTramiteData((prevTramite) => ({
      ...prevTramite,
      user: userData // Asigna userData al estado user dentro de tramiteData
    }));

    props.onNextStep(); // Llama a la función para pasar al siguiente paso
  };

  return (
    <Container style={{ background: "#e8edf7", maxWidth:"1100px", borderRadius: "15px" }} className='mt-5'>
      <Row>
        <Col className="d-flex flex-column align-items-center mt-3">
          <MDBIcon fas icon="user-edit" size="2x" />
          <h4>Informacion Personal</h4>
        </Col>
      </Row>

      <div className='p-3'>
        <Row >
          <Col xs={12} md={6} className="mb-3">
            <MDBInput
              label="Nombre"
              type="text"
              className="custom-input"
              name="firstname"
              value={userData.firstname}
              onChange={handleFormData}
              required
            />
          </Col>
          <Col xs={12} md={6} className="mb-3">
            <MDBInput
              label="Apellido"
              type="text"
              className="custom-input"
              name="lastname"
              value={userData.lastname}
              onChange={handleFormData}
              required
            />
          </Col>
        </Row>

        <Row>
          <Col md="6" className="mb-3">
            <Form.Select
              name="document_type"
              value={userData.document_type}
              onChange={handleFormData}
              required
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
              type="text"
              className="custom-input"
              name="number"
              value={userData.number}
              onChange={handleFormData}
              required
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6} className="mb-3">
            <MDBInput
              label="Dirección"
              type="text"
              className="custom-input"
              name="address"
              value={userData.address}
              onChange={handleFormData}
              required
            />
          </Col>

          <Col md={3} className="mb-3">
            <MDBInput
              label="Número"
              id="numero"
              type="text"
              className="custom-input"
              name="address_number"
              value={userData.address_number}
              onChange={handleFormData}
              required
            />
          </Col>

          <Col md={3} className="mb-3">
            <MDBInput
              label="Piso - Dpto"
              id="piso/dpto"
              type="text"
              className="custom-input"
              name="floor"
              value={userData.floor}
              onChange={handleFormData}
              required
            />
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-3">
            <MDBInputGroup noWrap textBefore="@">
              <input
                className="form-control"
                type="text"
                placeholder="Correo Electonico"
                name="email"
                value={userData.email}
                onChange={handleFormData}
                required
              />
            </MDBInputGroup>
          </Col>

          <Col md={3} className="mb-3">
            <MDBInput
              label="Telefono"
              id="telefono"
              type="text"
              className="custom-input"
              name="phone"
              value={userData.phone}
              onChange={handleFormData}
              required
            />
          </Col>

          <Col md={3} className="mb-3">
            <MDBInput
              label="Fecha de Nacimiento"
              type="date"
              className="custom-input"
              name="birthdate"
              value={userData.birthdate}
              onChange={handleFormData}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col md={6} className="d-flex justify-content-end">
            <MDBBtn className="d-flex justify-content-center align-items-center w-100" color="success" onClick={handleNextStep}>
              <MDBIcon
                fas
                icon="check-circle"
                size="2x"
                style={{ marginRight: '10px' }}
              />
              <span className='mb-0'>Validar Datos</span>
            </MDBBtn>
          </Col>

        </Row>
      </div>

    </Container >
  );
}

export default REQTRAMITE_FirstStep