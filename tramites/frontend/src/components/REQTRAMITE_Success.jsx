import React, { useEffect, useState } from 'react';
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
    const [payment, setPayment] = useState(null);

    const user = JSON.parse(localStorage.getItem('user_data'));

    useEffect(() => {
        // Llamada para obtener el ID del caso y el pago al mismo tiempo
        const fetchData = async () => {
            try {
                const userID = user.id;
                const [casesResponse, paymentsResponse] = await Promise.all([
                    axios.get(`http://127.0.0.1:8000/api/list-cases-by-user/${userID}/pendiente-de-pago/`),
                    axios.get(`http://127.0.0.1:8000/api/list-payment/`)
                ]);

                if (casesResponse.data.length > 0) {
                    setCaseID(casesResponse.data[0].id);
                }

                if (paymentsResponse.data.length > 0) {
                    setPayment(paymentsResponse.data[paymentsResponse.data.length - 1]);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user.id]);

    useEffect(() => {
        // Cambia el estado del caso después de obtener el caseID
        const changeStatus = async () => {
            if (caseID) {
                try {
                    await axios.patch(`http://127.0.0.1:8000/api/claim-case/${caseID}/`, { status: 'solicitado' });
                    console.log("Se cambió el estado del caso");
                } catch (error) {
                    console.error("Error al cambiar el estado del caso:", error);
                }
            }
        };

        changeStatus();
    }, [caseID]);

    useEffect(() => {
        // Actualiza el ID del caso en el pago después de obtener tanto caseID como payment
        const updatePaymentCaseId = async () => {
            if (caseID && payment) {
                try {
                    await axios.patch(`http://127.0.0.1:8000/api/update-caseId/${payment.transaction_Id}/`, {
                        case_id: caseID
                    });
                    console.log('Se actualizó el ID del pago con el ID del caso:', caseID);
                } catch (error) {
                    console.error('Error al actualizar el ID del caso en el pago:', error);
                }
            }
        };

        updatePaymentCaseId();
    }, [caseID, payment]);

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

            <Container className="d-flex justify-content-center my-auto p-5" style={{ width: "60%", backgroundColor: "#92E990", borderRadius: "12px" }}>
                <Row style={{ borderRadius: "12px", width: "80%" }}>
                    <Col md={12} lg={4} className="d-flex justify-content-center align-items-center">
                        <MDBIcon far icon="check-circle" style={{ color: "black" }} size='7x' />
                    </Col>
                    <Col md={12} lg={8} className="d-flex justify-content-center align-items-center">
                        <h3 style={{ color: "black", marginTop: "10px" }}>¡Tu trámite fue procesado de manera correcta!
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
    );
};

export default REQTRAMITE_Success;
