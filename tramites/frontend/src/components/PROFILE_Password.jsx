import React from 'react'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { MDBIcon, MDBInput, MDBBtn } from "mdb-react-ui-kit";

const PROFILE_Password = () => {
    return (
        <Container className="mt-4">
            <div id="editprofileMain" className="m-3">

                <Row className="mb-3">
                    <Col md={6} className="d-flex justify-content-start align-items-center">
                        <MDBIcon fas icon="key" size='2x' />
                        <h5 style={{ marginLeft: '6px' }}>Datos de acceso</h5>
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
                            type="password"
                            className="custom-input mb-3"
                        />
                    </Col>
                    <Col xs={12} md={4} xl={3}>
                        <MDBInput
                            label="Confirmar contraseña"
                            id="confirm_password"
                            type="password"
                            className="custom-input mb-3"
                        />
                    </Col>
                    <Col xs={12} md={4} xl={6}>
                        <div className="d-grid gap-2">
                            <MDBBtn type="submit" color="success">
                                Cambiar contraseña
                            </MDBBtn>
                        </div>
                    </Col>
                </Row>

            </div>
        </Container>
    );
}

export default PROFILE_Password