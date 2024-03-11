import React, { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useTramite } from '../context/TramiteProvider';
import { useParams, useNavigate } from 'react-router-dom';
import LOADING_Spinner from './LOADING_Spinner';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import axios from 'axios';
import {
    MDBBtn,
    MDBIcon,
    MDBFile
} from "mdb-react-ui-kit";

const REQTRAMITE_ThirdStep = (props) => {
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [fieldsCompleted, setFieldsCompleted] = useState(false);
    const navigate = useNavigate();
    const { tramiteData, setTramiteData } = useTramite();
    const [documentation, setDocumentation] = useState({
        frente: "",
        dorso: "",
    });
    const [preferenceId, setPreferenceId] = useState(null);
    
    useEffect(() => {
        const areFieldsCompleted = documentation.frente !== "" && documentation.dorso !== "";
        setFieldsCompleted(areFieldsCompleted);
    }, [documentation]);

    useEffect(() => {
        const fetchData = async () => {
            initMercadoPago("TEST-8dd16f5f-25c7-4d8c-b2ed-cba4e2242fe4", {
                locale: "es-AR",
            });

            handleBuy();
        };

        fetchData();
        setIsLoading(false);
    }, []);

    const createPreference = async () => {
        try {
            const response = await axios.post("http://localhost:3000/create_preference", {
                title: "Tramite estatico",
                price: 100,
                quantity: 1,
            });

            const { id } = response.data;
            return id;

        } catch (error) {
            console.error(error);
        }
    };

    const handleBuy = async () => {
        const id = await createPreference();
        if (id) {
            setPreferenceId(id);
        }
    };

    const handleChange = (e) => {
        const { name, files } = e.target;
        setDocumentation({ ...documentation, [name]: files[0] });
    }

    useEffect(() => {
        setTramiteData((prevTramite) => ({
            ...prevTramite,
            documentation: documentation // Asigna userData al estado user dentro de tramiteData
        }));
    }, [documentation]);


    const getDate = () => {
        const fecha = new Date();
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Agrega ceros iniciales si es necesario
        const day = String(fecha.getDate()).padStart(2, '0'); // Agrega ceros iniciales si es necesario

        return `${year}-${month}-${day}`;
    }

    /*
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('tramite', id);
            formData.append('solicitante', tramiteData.user.id);
            formData.append('request_date', getDate());
            formData.append('status', 'solicitado');

            // Datos familiares
            formData.append('nombre_madre', tramiteData.family_data.nombre_madre);
            formData.append('madre_vive', tramiteData.family_data.madre_vive);
            formData.append('nombre_padre', tramiteData.family_data.nombre_padre);
            formData.append('padre_vive', tramiteData.family_data.padre_vive);
            formData.append('numero_hijos', tramiteData.family_data.nro_hijos);
            formData.append('entidad_solicitante', tramiteData.family_data.entidad_solicitante);

            // Imagenes
            formData.append('dni_frente', documentation.frente);
            formData.append('dni_dorso', documentation.dorso);
            console.log(formData);

            const response = await axios.post('http://127.0.0.1:8000/api/request-tramite/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const res = response.data;
            if (response.status === 201) {
                toast.success("El trámite fue generado exitosamente");
                navigate('/misTramites');
            }
        } catch (error) {
            console.error(error);
        }
    }*/

    if (isLoading) {
        // Muestra el spinner mientras la página está cargando
        return <LOADING_Spinner />;
    }

    return (
        <Container style={{ background: "#e8edf7", maxWidth: "1100px", borderRadius: "15px" }} className='mt-5 mb-5'>
            <Row>
                <Col className="d-flex flex-column align-items-center mt-3">
                    <MDBIcon fas icon="user-edit" size="2x" />
                    <h4>Documentación adicional</h4>
                </Col>
            </Row>


            <div className='p-3'>
                <Row>
                    <Col className='d-flex align-items-center'>
                        <MDBIcon fas icon="id-card" size="2x" />
                        <h5 className='mx-3 mb-0'>
                            Fotos del Documento (Tome una imagen del frente y dorso)
                        </h5>
                    </Col>
                </Row>
                <Row className='mt-2 mb-3'>
                    <Col sm={12} xl={6}>
                        <MDBFile label='Frente'
                            id='customFile'
                            name='frente'
                            onChange={handleChange}
                            required
                        />
                    </Col>

                    <Col sm={12} xl={6}>
                        <MDBFile label='Dorso'
                            id='customFile'
                            name='dorso'
                            onChange={handleChange}
                            required
                        />
                    </Col>
                </Row>

                <Row className='d-flex align-items-center'>
                    <Col md={6} className="d-flex justify-content-start">
                        <MDBBtn className="d-flex justify-content-center align-items-center mb-3 w-100" color="danger" onClick={props.onPreviousStep} style={{ height: '48px' }}>
                            <MDBIcon
                                fas
                                icon="arrow-circle-left"
                                size="2x"
                                style={{ marginRight: '10px' }}
                            />
                            <span className='mb-0'>Volver</span>
                        </MDBBtn>
                    </Col>
                    <Col md={6}>
                        {fieldsCompleted && 
                        <Wallet initialization={{ preferenceId: preferenceId }} />}
                        
                    </Col>
                </Row>
            </div>



        </Container >
    );
}

export default REQTRAMITE_ThirdStep