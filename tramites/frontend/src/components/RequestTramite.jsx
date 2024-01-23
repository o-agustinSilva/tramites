import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  MDBInput,
  MDBInputGroup,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";

export function RequestTramite() {
  return (
    <div>
      <Container fluid>
        <Row className="tramite-form">
          <Col className="d-flex flex-column align-items-center">
            <MDBIcon fas icon="user-edit" size="3x" />
            <h2> Informacion Personal</h2>
          </Col>

          <Row>
            <Col id="infoTramite">
              <form>
                <Row>
                  <Col d="6" className="mb-3">
                    <MDBInput
                      label="Nombre"
                      id="form1"
                      type="text"
                      className="custom-input"
                    />
                  </Col>

                  <Col d="6" className="mb-3">
                    <MDBInput
                      label="Apellido"
                      id="form1"
                      type="text"
                      className="custom-input"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md="6" className="mb-3">
                    <Form.Select
                      aria-label="Default select example"
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
                      id="dni"
                      type="text"
                      className="custom-input"
                      name="number"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md="8" className="mb-3">
                    <MDBInput
                      label="Direccion: calle"
                      id="calle"
                      type="text"
                      className="custom-input"
                      name="direccion"
                    />
                  </Col>

                  <Col md="2" className="mb-3">
                    <MDBInput
                      label="Número"
                      id="numero"
                      type="text"
                      className="custom-input"
                      name="namber"
                    />
                  </Col>

                  <Col md="2" className="mb-3">
                    <MDBInput
                      label="Piso-Dpto"
                      id="piso/dpto"
                      type="text"
                      className="custom-input"
                      name="namber"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md="6" className="mb-3">
                    <MDBInput
                      label="Telefono"
                      id="telefono"
                      type="text"
                      className="custom-input"
                      name="number"
                    />
                  </Col>

                  <Col md="6" className="mb-3">
                    <MDBInput
                      label="Fecha de Nacimiento"
                      id="fecha"
                      type="text"
                      className="custom-input"
                      name="fecha"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md="6" className="mb-3">
                    <MDBInputGroup noWrap textBefore="@">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Correo Electonico"
                      />
                    </MDBInputGroup>
                  </Col>
                </Row>

                <Row className="my-3 mb-1">
                  <Col className="d-flex justify-content-end">
                    <MDBBtn className="mx-3" color="success">
                      {" "}
                      <MDBIcon
                        fas
                        icon="thumbs-up"
                        size="2x"
                        className="mx-2"
                      />
                      Validar Datos
                    </MDBBtn>
                    <MDBBtn color="danger">
                      {" "}
                      <MDBIcon
                        fas
                        icon="thumbs-down"
                        className="mx-2"
                        size="2x"
                      />
                      Modificar Datos
                    </MDBBtn>
                  </Col>
                </Row>
              </form>
            </Col>

            <Col id="infoTramite">
              <form>
                <Row>
                  <Col className="mb-3">
                    <MDBInput
                      label="Padre: Nombre y Apellido"
                      id="form1"
                      type="text"
                      className="custom-input"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md="2">
                    <p>¿Vive?</p>
                  </Col>

                  <Col>
                    <MDBCheckbox
                      name="inlineCheck"
                      id="inlineCheckbox1"
                      value="option1"
                      label="Si"
                      inline
                    />
                    <MDBCheckbox
                      name="inlineCheck"
                      id="inlineCheckbox2"
                      value="option2"
                      label="No"
                      inline
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className="mb-3">
                    <MDBInput
                      label="Madre: Nombre y Apellido"
                      id="form1"
                      type="text"
                      className="custom-input"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md="2">
                    <p>¿Vive?</p>
                  </Col>

                  <Col>
                    <MDBCheckbox
                      name="inlineCheck"
                      id="inlineCheckbox1"
                      value="option1"
                      label="Si"
                      inline
                    />
                    <MDBCheckbox
                      name="inlineCheck"
                      id="inlineCheckbox2"
                      value="option2"
                      label="No"
                      inline
                    />
                  </Col>
                </Row>

                <Row className="my-4">
                  <Col md="2">
                    <p>Hijos N°</p>
                  </Col>

                  <Col xl={6}>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="1">4</option>
                      <option value="2">5</option>
                      <option value="3">6</option>
                    </select>
                  </Col>
                  
                  <Row className="my-4">
                  <Col className="mb-3">
                    <MDBInput
                      label="Entidad que lo solicita"
                      id="form1"
                      type="text"
                      className="custom-input"
                    />
                  </Col>
                  </Row>
                

                </Row>
              </form>
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
}

export default RequestTramite;
