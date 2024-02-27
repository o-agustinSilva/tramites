import React, { useState, useEffect } from 'react';
import { useTramite } from '../context/TramiteProvider';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {
    MDBInput,
    MDBInputGroup,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    MDBRadio,
} from "mdb-react-ui-kit";

const REQTRAMITE_SecondStep = (props) => {
    const { tramiteData, setTramiteData } = useTramite();
    const [data, setData] = useState({
        frente: "",
        dorso: "",
    });

    return (
        <Container style={{ background: "#e8edf7", maxWidth: "1100px", borderRadius: "15px" }} className='mt-5'>
            <Row>
                <Col className="d-flex flex-column align-items-center mt-3">
                    <MDBIcon fas icon="user-edit" size="2x" />
                    <h4> Informacion Familiar</h4>
                </Col>
            </Row>
            <div className='p-3'>
                <Row>
                    <Col md={6} className="mb-3">
                        <MDBInput
                            label="Padre: Nombre y Apellido"
                            type="text"
                            className="custom-input"
                        />
                    </Col>
                    <Col md={3} className='d-flex justify-content-center'>
                        <p className='mx-3'>¿Vive?</p>
                        <MDBRadio name='inlineRadio' id='inlineRadio1' value='option1' label='Si' inline />
                        <MDBRadio name='inlineRadio' id='inlineRadio2' value='option2' label='No' inline />
                    </Col>
                </Row>

                <Row>
                    <Col md={6} className="mb-3">
                        <MDBInput
                            label="Madre: Nombre y Apellido"
                            type="text"
                            className="custom-input"
                        />
                    </Col>

                    <Col md={3} className='d-flex justify-content-center'>
                        <p className='mx-3'>¿Vive?</p>
                        <MDBRadio name='inlineRadio' id='inlineRadio1' value='option1' label='Si' inline />
                        <MDBRadio name='inlineRadio' id='inlineRadio2' value='option2' label='No' inline />
                    </Col>
                </Row>

                <Row className='d-flex align-items-center'>
                    <Col md={1}>
                        <p>Hijos N°</p>
                    </Col>

                    <Col md={5} className='mb-3 d-flex justify-content-start'>
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
                    <Col md={6} className="mb-3">
                        <MDBInput
                            label="Entidad que lo solicita"
                            id="form1"
                            type="text"
                            className="custom-input"
                        />
                    </Col>
                </Row>

                <Row>
                    <Col className="d-flex justify-content-start">
                        <MDBBtn className="d-flex align-items-center" color="danger" onClick={props.onPreviousStep}>
                            <MDBIcon
                                fas
                                icon="arrow-circle-left"
                                size="2x"
                                style={{ marginRight: '10px' }}
                            />
                            <span className='mb-0'>Volver</span>
                        </MDBBtn>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <MDBBtn className="d-flex align-items-center" color="success" onClick={props.onNextStep}>
                            <MDBIcon
                                fas
                                icon="check-circle"
                                size="2x"
                                style={{ marginRight: '10px' }}
                            />
                            <span className='mb-0'>Confirmar</span>
                        </MDBBtn>
                    </Col>
                </Row>
            </div>


        </Container >
    );
}

export default REQTRAMITE_SecondStep