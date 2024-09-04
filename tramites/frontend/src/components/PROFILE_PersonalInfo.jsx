import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import { MDBIcon, MDBInput, MDBBtn } from "mdb-react-ui-kit";

export function PROFILE_PersonalInfo({ user }) {
  
  const [inputValue, setInputValue] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Container className="mt-4">
      <div id="editprofileMain" className="m-3">
        <Row className="mb-3">
          <Col md={12} className="d-flex justify-content-start align-items-center">
            <MDBIcon fas icon="user-edit" size="2x" />
            <h5 style={{ marginLeft: "6px" }}>Datos personales</h5>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <MDBInput
              label="Nombre"
              type="text"
              className="custom-input mb-3"
              value={user.firstname || ''}
            />
          </Col>
          <Col xs={12} md={6}>
            <MDBInput
              label="Apellido"
              type="text"
              className="custom-input mb-3"
              value={user.lastname || ''}
            />
          </Col>

          <Col md={12} xl={6}>
            <MDBInput
              label="Fecha de nacimiento"
              type="date"
              className="custom-input mb-3"
              value={user.birthdate || ''}
            />
          </Col>

          <Col md={6} xl={2}>
            <Form.Select name="document_type" className="mb-3" defaultValue={user.document_type || ''}>
              <option value="" disabled>
                Seleccione tipo de documento
              </option>
              <option value="DNI">DNI</option>
              <option value="TWO">PASAPORTE</option>
            </Form.Select>
          </Col>

          <Col md={6} xl={4}>
            <MDBInput
              label="Número de documento"
              type="text"
              className="custom-input mb-3"
              value={user.number || ''}
            />
          </Col>

          <Col md={8} xl={6}>
          <MDBInput
              label="Género"
              type="text"
              className="custom-input mb-3"              
              value={user.genre==='male' ? 'Hombre': (user.genre === 'female' ? 'Mujer' : inputValue)}
              onChange={handleInput}
            />

          </Col>

        </Row>

      </div>
    </Container>

  );
}

export default PROFILE_PersonalInfo;