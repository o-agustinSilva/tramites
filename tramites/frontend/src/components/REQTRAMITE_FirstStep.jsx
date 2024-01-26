import React from 'react';
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
            />
          </Col>
          <Col xs={12} md={6} className="mb-3">
            <MDBInput
              label="Apellido"
              type="text"
              className="custom-input"
            />
          </Col>
        </Row>

        <Row>
          <Col md="6" className="mb-3">
            <Form.Select
              name="document_type"
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
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6} className="mb-3">
            <MDBInput
              label="Dirección"
              type="text"
              className="custom-input"
              name="direccion"
            />
          </Col>

          <Col md={3} className="mb-3">
            <MDBInput
              label="Número"
              id="numero"
              type="text"
              className="custom-input"
              name="namber"
            />
          </Col>

          <Col md={3} className="mb-3">
            <MDBInput
              label="Piso - Dpto"
              id="piso/dpto"
              type="text"
              className="custom-input"
              name="namber"
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
              />
            </MDBInputGroup>
          </Col>

          <Col md={3} className="mb-3">
            <MDBInput
              label="Telefono"
              id="telefono"
              type="text"
              className="custom-input"
              name="number"
            />
          </Col>

          <Col md={3} className="mb-3">
            <MDBInput
              label="Fecha de Nacimiento"
              type="date"
              className="custom-input"
              name="fecha"
            />
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-end">
            <MDBBtn className="d-flex align-items-center" color="success" onClick={props.onNextStep}>
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