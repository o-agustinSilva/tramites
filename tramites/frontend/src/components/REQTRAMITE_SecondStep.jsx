import React, { useEffect, useState } from 'react';
import { useTramite } from '../context/TramiteProvider';
import { toast } from 'react-toastify';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {
    MDBInput,
    MDBBtn,
    MDBIcon,
    MDBRadio,
    MDBTextArea
} from "mdb-react-ui-kit";

const REQTRAMITE_SecondStep = (props) => {
    const [validated, setValidated] = useState(false);
    const { tramiteData, setTramiteData } = useTramite();
    const [data, setData] = useState({
        nombre_padre: tramiteData?.family_data?.nombre_padre || "",
        padre_vive: tramiteData?.family_data?.padre_vive || "",
        nombre_madre: tramiteData?.family_data?.nombre_madre || "",
        madre_vive: tramiteData?.family_data?.madre_vive || "",
        nro_hijos: tramiteData?.family_data?.nro_hijos || "0",
        entidad_solicitante: tramiteData?.family_data?.entidad_solicitante || "",
        nacionalidad: tramiteData?.family_data?.nacionalidad || "",
        ocupacion: tramiteData?.family_data?.ocupacion || "",
        estado_civil: tramiteData?.family_data?.estado_civil || "",
        residencia: tramiteData?.family_data?.residencia || "",
        detalle_extravio: tramiteData?.family_data?.detalle_extravio || "",
    });

    const handleFormData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleNextStep = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() == false) {
            event.preventDefault();
            event.stopPropagation();
            toast.error("Completar los campos requeridos");
        } 
        

        setTramiteData((prevTramite) => ({
            ...prevTramite,
            family_data: data
        }));

        setValidated(true);

        if (form.checkValidity() == true) {
            props.onNextStep();
        } 
    };


    return (
        <Container style={{ background: "#e8edf7", maxWidth: "1100px", borderRadius: "15px" }} className='mt-5 p-3'>
            <Form className='p-3' noValidate validated={validated} onSubmit={handleNextStep}>
                {/* Información familiar*/}
                {props.tramite?.requirement.includes(3) &&
                    <>
                        <Row>
                            <Col md={6} className="mb-3">
                                <MDBInput
                                    label="Padre: nombre y apellido"
                                    type="text"
                                    className="custom-input"
                                    name="nombre_padre"
                                    value={data.nombre_padre}
                                    onChange={handleFormData}
                                />
                            </Col>
                            <Col md={3} className='d-flex justify-content-center'>
                                <p className='mx-3'>¿Vive?</p>
                                <MDBRadio name='padre_vive' value='true' label='Si' inline onChange={handleFormData} required />
                                <MDBRadio name='padre_vive' value='false' label='No' inline onChange={handleFormData} />
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6} className="mb-3">
                                <MDBInput
                                    label="Madre: nombre y apellido"
                                    type="text"
                                    className="custom-input"
                                    name="nombre_madre"
                                    value={data.nombre_madre}
                                    onChange={handleFormData}
                                />
                            </Col>

                            <Col md={3} className='d-flex justify-content-center'>
                                <p className='mx-3'>¿Vive?</p>
                                <MDBRadio name='madre_vive' value='true' label='Si' inline onChange={handleFormData} required />
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
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
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
                    </>
                }

                {/* Nacionalidad */}
                <Row>
                    {props.tramite?.requirement.includes(4) &&
                        <>
                            <Col md={6} className='mb-3'>
                                <MDBInput
                                    label="Nacionalidad"
                                    type="text"
                                    className="custom-input"
                                    name="nacionalidad"
                                    value={data.nacionalidad}
                                    onChange={handleFormData}
                                    required
                                >
                                </MDBInput>
                            </Col>
                        </>
                    }

                    {/* Ocupación  */}
                    {props.tramite?.requirement.includes(5) &&
                        <>
                            <Col md={6} className='mb-3'>
                                <Form.Select
                                    name="ocupacion"
                                    value={data.ocupacion}
                                    onChange={handleFormData}
                                    required
                                >
                                    <option value="" disabled>
                                        Ocupación
                                    </option>
                                    <option value="estudiante">Estudiante</option>
                                    <option value="empleado">Empleado/a</option>
                                    <option value="desocupado">Desocupado/a</option>
                                    <option value="jubilado">Jubilado/a</option>
                                </Form.Select>
                            </Col>
                        </>
                    }
                </Row>

                {/* Estado civil  */}
                <Row>
                    {props.tramite?.requirement.includes(5) &&
                        <>
                            <Col md={6} className='mb-3'>
                                <Form.Select
                                    name="estado_civil"
                                    value={data.estado_civil}
                                    onChange={handleFormData}
                                    required
                                >
                                    <option value="" disabled>
                                        Estado civil
                                    </option>
                                    <option value="soltero">Soltero/a</option>
                                    <option value="casado">Casado/a</option>
                                    <option value="divorciado">Divorciado/a</option>
                                    <option value="viudo">Viudo/a</option>
                                </Form.Select>
                            </Col>
                        </>
                    }

                    {/* Ciudad de residencia  */}
                    {props.tramite?.requirement.includes(6) &&
                        <>
                            <Col md={6} className='mb-3'>
                                <MDBInput
                                    label="Ciudad de residencia"
                                    type="text"
                                    className="custom-input"
                                    name="residencia"
                                    value={data.residencia}
                                    onChange={handleFormData}
                                    required
                                />
                            </Col>
                        </>
                    }
                </Row>

                <Row>
                    {props.tramite?.id == 5 &&
                        <>
                            <Col md={12} className='mb-3'>
                                <MDBTextArea
                                    label="Detalle del extravio"
                                    id="textAreaExample"
                                    rows={7}
                                    className='custom-input'
                                    name='detalle_extravio'
                                    value={data.detalle_extravio}
                                    onChange={handleFormData}
                                    required
                                />
                            </Col>
                        </>
                    }
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
                        <MDBBtn className="d-flex align-items-center" color="success">
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
            </Form>
        </Container >
    );
}

export default REQTRAMITE_SecondStep