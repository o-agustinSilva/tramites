import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MDBIcon } from "mdb-react-ui-kit";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export function RequestTramite() {
  return (
    <div>
      <Container>
        <Row className="tramite-form">
          <Col className="d-flex flex-column align-items-center">
            <MDBIcon fas icon="user-edit" size="3x" />
            <h2> Informacion Personal</h2>
          </Col>

          <Row>
            <Col id="infoTramite">
              <form>
                <ul>
                  <li>
                    <label className="labelRequest">Nombre: </label>
                    <input className="inputRequest form-control" />
                  </li>
                  <li>
                    <label className="labelRequest">Apellido: </label>
                    <input className="inputRequest form-control" />
                  </li>
                  <li>
                    <label className="labelRequest">D.N.I N°: </label>
                    <input className="inputRequest form-control" />
                  </li>
                  <li>
                    <label className="labelRequest">Dirección: </label>
                    <input className="inputRequest form-control" />
                  </li>
                  <li>
                    <label className="labelRequest">Telefono: </label>
                    <input className="inputRequest form-control" />
                  </li>
                  <li>
                    <label className="labelRequest">Fecha de Nacimiento</label>
                    <input className="inputRequest form-control" />
                  </li>
                  <li>
                    <label className="labelRequest">Correo Electronico: </label>
                    <input className="inputRequest form-control" />
                  </li>
                </ul>
                <Row>
                  <Col xl={6} sm={12} className="my-2">
                    <MDBBtn>
                      <MDBIcon
                        fas
                        icon="check-circle"
                        className="mx-2 btDoc"
                        size="2x"
                      />
                      Validar Datos
                    </MDBBtn>
                  </Col>
                  <Col xl={6} sm={12} className="my-2">
                    <Link to="/perfil">
                      <MDBBtn color="danger">
                        <MDBIcon
                          fas
                          icon="times-circle"
                          className="mx-2 btDoc"
                          size="2x"
                        />
                        Modificar Datos
                      </MDBBtn>
                    </Link>
                  </Col>
                </Row>
              </form>
            </Col>

            <Col id="infoTramite">
              <form>
                <ul>
                  <li id="liTramite">
                    <label className="labelRequest">
                      Padre: Nombre y Apellido
                    </label>
                    <input className="inputRequest form-control" />
                  </li>

                  <li className="d-flex flex-row">
                    <label className="labelRequest labelCheck">¿Vive?</label>
                    <div className="form-check labelCheck">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Si
                      </label>
                    </div>

                    <div className="form-check labelCheck">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        No
                      </label>
                    </div>
                  </li>

                  <li id="liTramite">
                    <label className="labelRequest">
                      Madre: Nombre y Apellido
                    </label>
                    <input className="inputRequest form-control" />
                  </li>

                  <li className="d-flex flex-row">
                    <label className="labelRequest labelCheck">¿Vive?</label>
                    <div className="form-check labelCheck">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Si
                      </label>
                    </div>

                    <div className="form-check labelCheck">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        No
                      </label>
                    </div>
                  </li>

                  <li id="liTramite">
                    <label className="labelRequest">Hijos N°</label>
                    <select className="numeroSelector" name="numero">
                      <option value="1">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </li>

                  <li id="liTramite">
                    <label className="labelRequest">
                      Entidad que lo solicita
                    </label>
                    <input className="inputRequest form-control" />
                  </li>
                </ul>
              </form>
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
}

export default RequestTramite;
