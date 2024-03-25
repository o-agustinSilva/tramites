import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBIcon } from 'mdb-react-ui-kit';

const REQTRAMITE_Success = () => {
    return (
        <div className='App'>
            <Header />

            <Container className="d-flex justify-content-center my-auto p-5" style={{ height: "200px", background: "#92E990"}}>
                <Row style={{ borderRadius: "12px", width:"80%" }}>
                    <Col md={4} className="d-flex justify-content-center align-items-center">
                        <MDBIcon far icon="check-circle" style={{ color: "black" }} size='7x' />

                    </Col>
                    <Col md={8} className="d-flex justify-content-center align-items-center">
                        <h3 style={{ color: "black" }}>¡Tu trámite fue procesado de manera correcta!
                            Recibiras el certificado correspondiente por medio de tu correo electrónico</h3>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    )
}

export default REQTRAMITE_Success