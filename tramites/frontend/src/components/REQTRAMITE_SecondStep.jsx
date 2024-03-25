import React, { useState } from 'react';
import { useTramite } from '../context/TramiteProvider';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
    MDBInput,
    MDBBtn,
    MDBIcon,
    MDBRadio,
} from "mdb-react-ui-kit";

const REQTRAMITE_SecondStep = (props) => {
    const { tramiteData, setTramiteData } = useTramite();
    const [data, setData] = useState({
        nombre_padre: "",
        padre_vive: "",
        nombre_madre: "",
        madre_vive: "",
        nro_hijos: "0",
        entidad_solicitante: "",
    });

    const handleFormData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleNextStep = () => {

        // Chequeo de campos obligatorios
        if (data.entidad_solicitante === "") return;

        setTramiteData((prevTramite) => ({
            ...prevTramite,
            family_data: data
        }));

        props.onNextStep(); // Llama a la función para pasar al siguiente paso
    };

    return (
        <Container style={{ background: "#e8edf7", maxWidth: "1100px", borderRadius: "15px" }} className='mt-5'>
            <Row>
                <Col className="d-flex flex-column align-items-center mt-3">
                    <MDBIcon fas icon="user-edit" size="2x" />
                    <h4> Informacion Familiar</h4>
                </Col>
            </Row>
            <form className='p-3'>
                <Row>
                    <Col md={6} className="mb-3">
                        <MDBInput
                            label="Padre: Nombre y Apellido"
                            type="text"
                            className="custom-input"
                            name="nombre_padre"
                            value={data.nombre_padre}
                            onChange={handleFormData}
                        />
                    </Col>
                    <Col md={3} className='d-flex justify-content-center'>
                        <p className='mx-3'>¿Vive?</p>
                        <MDBRadio name='padre_vive' value='true' label='Si' inline onChange={handleFormData} required/>
                        <MDBRadio name='padre_vive' value='false' label='No' inline onChange={handleFormData} />
                    </Col>
                </Row>

                <Row>
                    <Col md={6} className="mb-3">
                        <MDBInput
                            label="Madre: Nombre y Apellido"
                            type="text"
                            className="custom-input"
                            name="nombre_madre"
                            value={data.nombre_madre}
                            onChange={handleFormData}
                        />
                    </Col>

                    <Col md={3} className='d-flex justify-content-center'>
                        <p className='mx-3'>¿Vive?</p>
                        <MDBRadio name='madre_vive' value='true' label='Si' inline onChange={handleFormData} required/>
                        <MDBRadio name='madre_vive' value='false' label='No' inline onChange={handleFormData} />
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
                        name="nro_hijos"
                        value={data.nro_hijos}
                        onChange={handleFormData}
                        >
                            <option value="0">0</option>
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
                            type="text"
                            className="custom-input"
                            name="entidad_solicitante"
                            value={data.entidad_solicitante}
                            onChange={handleFormData}
                            required
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
                        <MDBBtn className="d-flex align-items-center" color="success" onClick={handleNextStep}>
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
            </form>


        </Container >
    );
}

export default REQTRAMITE_SecondStep