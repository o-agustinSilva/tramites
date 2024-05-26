import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';

const REQTRAMITE_Success = () => {
    const navigate = useNavigate(); 
    const [seconds, setSeconds] = useState(10);
    const [caseID, setCaseID] = useState(null);
    const user = JSON.parse(localStorage.getItem('user_data'));

    useEffect(() => {
        const getCase = async () => {
            const userID = user.id;
            axios.get(`http://127.0.0.1:8000/api/list-cases-by-user/${userID}/pendiente-de-pago/`)
            .then(response => {
                if (response.data.length > 0)
                    setCaseID(response.data[0].id);
            })
        };

        getCase();
    }, []);

    useEffect(() => {
        const changeStatus = async () => {
            if (caseID) {
                axios.patch(`http://127.0.0.1:8000/api/claim-case/${caseID}/`, { status: 'solicitado' })
                .then(response => {
                    console.log("Se camnbió el estado del caso");
                })
            }
        };

        changeStatus();
    }, [caseID]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);

        if (seconds === 0) {
            clearInterval(interval); 
            navigate('/'); 
        }

        return () => clearInterval(interval);
    }, [seconds, navigate]);
    
    return (
        <div className='App'>
            <Header />

            <Container className="d-flex justify-content-center my-auto p-5" style={{width:"60%", backgroundColor: "#92E990", borderRadius: "12px" }}>
                <Row style={{ borderRadius: "12px", width:"80%"}}>
                    <Col md={12} lg={4} className="d-flex justify-content-center align-items-center">
                        <MDBIcon far icon="check-circle" style={{ color: "black" }} size='7x' />

                    </Col>
                    <Col md={12} lg={8} className="d-flex justify-content-center align-items-center">
                        <h3 style={{ color: "black", marginTop:"10px" }}>¡Tu trámite fue procesado de manera correcta!
                            Recibirás el certificado correspondiente por medio de tu correo electrónico</h3>
                    </Col>
                </Row>
            </Container>
            <Container className='d-flex justify-content-center'>
                <Row>
                    <Col md={2}>
                        <Spinner animation="border" variant="primary" />

                    </Col>
                    <Col md={10} className='mt-1'>
                        <p>Volverás a inicio en {seconds} segundos...</p>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default REQTRAMITE_Success