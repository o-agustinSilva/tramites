import React, { useState, useEffect, useRef } from 'react';
import TRAMITE_Comprobante from './TRAMITE_Comprobante';
import TRAMITE_Pdf from '../pdf/TRAMITE_Pdf';
import { PDFViewer } from "@react-pdf/renderer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBAccordion,
  MDBAccordionItem
} from 'mdb-react-ui-kit';

const TRAMITES_TramiteDetail = ({ id }) => {
  const [justifyActive, setJustifyActive] = useState('tab1');
  const [tramite, setTramite] = useState([]);

  useEffect(() => {
    const response = axios.get(`http://localhost:8000/api/get-case/${id}/`)
      .then(response => {
        if (response.status === 200) setTramite(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  useEffect(() => { console.log(tramite) }, [tramite])

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <Container>

      <Row className='mt-3 align-items-center'>
        <Col xs={6} className='d-flex justify-content-start'>
          <Link to="/misTramites">
            <MDBBtn floating size='lg' style={{ background: "#114b72" }}>
              <MDBIcon fas icon="arrow-circle-left" size='2x' />
            </MDBBtn>
          </Link>
        </Col>
        <Col xs={6} className='d-flex justify-content-end'>
          <h5 className='mb-0'>#{tramite.id}</h5>
        </Col>
      </Row>

      <div className="my-3 p-3" style={{ background: "#e8edf7", borderRadius: "10px" }}>
        <Row className='mt-3 align-items-center'>
        <Col md={12}>
            <h6>Datos de la solicitud</h6>
            <hr style={{ color: "black" }} />
          </Col>
          <Col md={4}>
            <MDBInput
              type='text'
              label='Trámite'
              className='custom-input'
              value={tramite?.tramite?.name || ''}
              name='name'
              readOnly
            />
          </Col>
          <Col md={4}>
            <MDBInput
              type='date'
              label='Fecha de solicitud'
              className='custom-input'
              value={tramite?.request_date || ''}
              name='request_date'
              readOnly
            />
          </Col>
          <Col md={4}>
            <MDBInput
              type='text'
              label='Estado'
              className='custom-input'
              value={tramite?.status ? tramite.status.charAt(0).toUpperCase() + tramite.status.slice(1) : ''}
              name='status'
              readOnly
            />
          </Col>
        </Row>

        <Row className='mt-4'>
          <Col md={12}>
            <h6>Fotos del documento</h6>
            <hr style={{ color: "black" }} />
          </Col>
          <Col md={6}>
            <img src={tramite?.dni_frente} alt="DNI Frente" width="95%" height="300px" style={{ borderRadius: '10px' }} />
          </Col>
          <Col md={6} className='d-flex justify-content-end'>
            <img src={tramite?.dni_dorso} alt="DNI Frente" width="95%" height="300px" style={{ borderRadius: '10px' }} />
          </Col>
        </Row>
      </div>

      <div className="mb-5" style={{ background: "#e8edf7", borderRadius: "10px" }}>
        <Row>
          <MDBAccordion borderless initialActive={0}>
            <MDBAccordionItem collapseId={1} headerTitle='Certificado'>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>

                {tramite && tramite.status === 'resuelto' ? (
                  <PDFViewer style={{ width: '80%', height: '90vh', borderRadius: '10px' }}>
                    <TRAMITE_Pdf />
                  </PDFViewer>
                ) : (
                  <p>Todavía no hay certificado</p>
                )}


              </div>
            </MDBAccordionItem>
            <MDBAccordionItem collapseId={2} headerTitle='Comprobante de pago'>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <TRAMITE_Comprobante />
              </div>
            </MDBAccordionItem>
          </MDBAccordion>
        </Row>
      </div>
    </Container>
  )
}

export default TRAMITES_TramiteDetail 