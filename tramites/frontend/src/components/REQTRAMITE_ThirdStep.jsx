import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {
    MDBBtn,
    MDBIcon,
    MDBFile
} from "mdb-react-ui-kit";

const REQTRAMITE_ThirdStep = (props) => {
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
                        <MDBFile label='Frente' id='customFile' />
                    </Col>

                    <Col sm={12} md={6}>
                        <MDBFile label='Dorso' id='customFile' />
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col className='d-flex align-items-center'>
                        <MDBIcon fas icon="file-alt" size="2x" />
                        <h5 className='mx-3 mb-0'>
                            Documentacion Adicional (Solo en caso de que se requiera)
                        </h5>
                    </Col>
                </Row>

                <Row className='mt-2 mb-3'>
                    <Col sm={12} md={12}>
                        <MDBFile label='Documentación' id='customFile' />
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
                        <MDBBtn className="d-flex align-items-center" color="success" onClick={() => alert("fin")}>
                            <MDBIcon
                                fas
                                icon="check-circle"
                                size="2x"
                                style={{ marginRight: '10px' }}
                            />
                            <span className='mb-0'>Ir a pagar</span>
                        </MDBBtn>
                    </Col>
                </Row>
            </div>

        </Container >
    );
}

export default REQTRAMITE_ThirdStep