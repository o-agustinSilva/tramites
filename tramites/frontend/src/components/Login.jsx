import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {MDBIcon} from 'mdb-react-ui-kit';

function Login() {
    return (
        <div id="login-container">
            <MDBIcon fas icon="user-edit" width="100px"  />
            <Container className="d-flex justify-content-center">
                <div className="container-fluid" id="login-box">
                    <h2 id="loginTitle">Iniciar sesión</h2>
                    <form className="loginForm">
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <label htmlFor="loginEmail">Correo electrónico</label>
                                    <input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" placeholder="Enter email" />
                                </div>
                            </Col>
                        </Row>

                        <div className="form-group">
                            <label htmlFor="loginPassword">Contraseña</label>
                            <input type="password" className="form-control" id="loginPassword" placeholder="Password" />
                            <div className="smallText">
                                <small id="forgotPassword" className="form-text text-muted"><Link to="#">¿Olvidaste tu contraseña?</Link></small>
                                <small id="createAccount" className="form-text text-muted"><Link to="/registrarse">Registrarse</Link></small>
                            </div>
                        </div>

                        <Link to="/perfil">
                            <button type="submit" className="buttonPrimary">Continuar</button>
                        </Link>      
                    </form>
                </div>
            </Container>
        </div>
    )
}

export default Login;