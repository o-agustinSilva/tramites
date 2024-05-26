import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';

const REQTRAMITE_Failure = () => {
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
        const deleteCase = async () => {
            if (caseID) {
                axios.delete(`http://127.0.0.1:8000/api/delete-case/${caseID}/`)
                .then(response => {
                    console.log("Se eliminó el caso");
                })
            }
        };

        deleteCase();
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
            <Container className="d-flex justify-content-center my-auto p-5" style={{ width: "60%", backgroundColor: "#E99090", borderRadius: "12px" }}>
                <Row style={{ borderRadius: "12px", width: "80%" }}>
                    <Col md={12} lg={4} className="d-flex justify-content-center align-items-center">
                        <MDBIcon far icon="times-circle" style={{ color: "black" }} size='7x' />
                    </Col>
                    <Col md={12} lg={8} className="d-flex justify-content-center align-items-center">
                        <h2 style={{ color: "black", marginTop: "10px" }}>Parece que algo no salió como se esperaba,
                            intentalo de nuevo más tarde.</h2>
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
    );
}

export default REQTRAMITE_Failure