import React, { useState, useEffect, useRef } from 'react';
import TRAMITE_Comprobante from './TRAMITE_Comprobante';
import TRAMITE_Pdf from '../pdf/TRAMITE_Pdf';
import { PDFViewer } from "@react-pdf/renderer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios';
import {
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBAccordion,
  MDBAccordionItem
} from 'mdb-react-ui-kit';

const TASK_Details = ({ id, onBack }) => {
  const [tramite, setTramite] = useState({});

  useEffect(() => {
    const fetchCase = (id) => {
      axios.get(`http://localhost:8000/api/get-case/${id}/`)
        .then(response => {
          setTramite(response.data);
        })
        .catch(error => {
          console.log(error);
        })
      console.log(tramite);
    }
    fetchCase(id)
  }, [])

  return (
    <Container>
      <Row className='mt-3 align-items-center'>
        <Col xs={6} className='d-flex justify-content-start'>
          <MDBBtn floating size='lg' style={{ background: "#114b72" }} onClick={onBack}>
            <MDBIcon fas icon="arrow-circle-left" size='2x' />
          </MDBBtn>
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

        <Row className='mt-3 align-items-center'>
          <Col md={12}>
            <h6>Datos del solicitante</h6>
            <hr style={{ color: "black" }} />
          </Col>
          <Col md={4}>
            <MDBInput
              type='text'
              label='Solicitante'
              className='custom-input'
              value={tramite?.solicitante?.firstname + ' ' + tramite?.solicitante?.lastname || ''}
              name='name'
              readOnly
            />
          </Col>
          <Col md={4}>
            <MDBInput
              type='text'
              label='Tipo de documento'
              className='custom-input'
              value={tramite?.solicitante?.document_type || ''}
              name='request_date'
              readOnly
            />
          </Col>
          <Col md={4}>
            <MDBInput
              type='text'
              label='Número'
              className='custom-input'
              value={tramite?.solicitante?.number || ''}
              name='status'
              readOnly
            />
          </Col>
        </Row>

        <Row className='mt-3 align-items-center'>
          <Col md={4}>
            <MDBInput
              type='text'
              label='Género'
              className='custom-input'
              value={tramite?.solicitante?.genre === 'male' ? 'Masculino' : tramite?.solicitante?.genre === 'female' ? 'Femenino' : ''}
              name='status'
              readOnly
            />
          </Col>
          <Col md={4}>
            <MDBInput
              type='date'
              label='Fecha de nacimiento'
              className='custom-input'
              value={tramite?.solicitante?.birthdate || ''}
              name='status'
              readOnly
            />
          </Col>
          <Col md={4}>
            <MDBInput
              type='text'
              label='Correo electrónico'
              className='custom-input'
              value={tramite?.solicitante?.email || ''}
              name='status'
              readOnly
            />
          </Col>
        </Row>

        <Row className='mt-3 align-items-center'>
          <Col md={4}>
            <MDBInput
              type='text'
              label='Dirección'
              className='custom-input'
              value={tramite?.solicitante?.address + ' ' + tramite?.solicitante?.address_number || ''}
              name='status'
              readOnly
            />
          </Col>
          <Col md={4}>
            <MDBInput
              type='text'
              label='Departamento'
              className='custom-input'
              value={tramite?.solicitante?.apartment || ''}
              name='status'
              readOnly
            />
          </Col>
          <Col md={4}>
            <MDBInput
              type='text'
              label='Piso'
              className='custom-input'
              value={tramite?.solicitante?.floor || ''}
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
            <MDBAccordionItem collapseId={1} headerTitle='Comprobante de pago'>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <TRAMITE_Comprobante />
              </div>
            </MDBAccordionItem>
          </MDBAccordion>
        </Row>
      </div>


      {tramite && tramite.status === 'resuelto' ? (
        <PDFViewer style={{ width: '80%', height: '90vh', borderRadius: '10px' }}>
          <TRAMITE_Pdf />
        </PDFViewer>
      ) : (
        <>
          <Row>
            <Col md={6} className="d-grid gap-2">
              <MDBBtn color='danger'>Rechazar solicitud</MDBBtn>
            </Col>
            <Col md={6} className="d-grid gap-2">
              <MDBBtn color='success'>Generar certificado</MDBBtn>
            </Col>
          </Row>
        </>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      </div>
    </Container>
  )
}

export default TASK_Details