import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import { MDBIcon, MDBInput, MDBBtn } from "mdb-react-ui-kit";

export function PROFILE_PersonalInfo() {
  return (
    <Container className="mt-3">
      <div id="editprofileMain" className="m-3">
        <Row className="mb-3">
          <Col md={12} className="d-flex justify-content-start align-items-center">
            <MDBIcon fas icon="user-edit" size="2x" />
            <h5 style={{marginLeft: "6px"}}>Datos personales</h5>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <MDBInput
              label="Nombre"
              type="text"
              className="custom-input mb-3"
            />
          </Col>
          <Col xs={12} md={6}>
            <MDBInput
              label="Apellido"
              type="text"
              className="custom-input mb-3"
            />
          </Col>

          <Col md={12} xl={6}>
            <MDBInput
              label="Fecha de nacimiento"
              type="date"
              className="custom-input mb-3"
            />
          </Col>

          <Col md={6} xl={2}>
            <Form.Select name="document_type" className="mb-3">
              <option value="" disabled>
                Seleccione tipo de documento
              </option>
              <option value="DNI">DNI</option>
              <option value="TWO">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>

          <Col md={6} xl={4}>
            <MDBInput
              label="Número de documento"
              type="text"
              className="custom-input mb-3"
            />
          </Col>

          <Col md={8} xl={6}>
            <Form.Select name="genre" className="mb-3">
              <option value="" disabled>
                Género
              </option>
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
            </Form.Select>
          </Col>

          <Col md={4} xl={6}>
            <div className="d-grid gap-2">
              <MDBBtn type="submit" color="success">
                Guardar cambios
              </MDBBtn>
            </div>
          </Col>
        </Row>

      </div>
    </Container>

  );
}

export default PROFILE_PersonalInfo;
