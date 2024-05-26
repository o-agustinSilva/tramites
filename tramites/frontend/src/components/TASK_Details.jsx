import React, { useState, useEffect, useRef } from 'react';
import TRAMITE_Comprobante from './TRAMITE_Comprobante';
import TRAMITE_BuenaConducta from '../pdf/TRAMITE_BuenaConducta';
import TRAMITE_Extravio from '../pdf/TRAMITE_Extravio';
import TRAMITE_Domicilio from '../pdf/TRAMITE_Domicilio';
import { pdf } from '@react-pdf/renderer';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios';
import { toast } from "react-toastify";
import {
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBAccordion,
  MDBAccordionItem,
  MDBRadio
} from 'mdb-react-ui-kit';

const TASK_Details = ({ id, onBack }) => {
  const tramitesInfoFam = [2, 1];
  const [tramite, setTramite] = useState({});
  const [data, setData] = useState({
    name: "",
    solicitante: "",
    year: "",
    dni: "",
    today: "",
    entity: "",
  });

  const generatePdf = async () => {
    const formData = new FormData();
    const normalizedDataName = data.name.toLowerCase();
    console.log(normalizedDataName);
    if (normalizedDataName.includes('certificado de buena conducta')) {
        const blob = await pdf(<TRAMITE_BuenaConducta data={data} />).toBlob();
        formData.append("certificado", blob, `${data.name}.pdf`);
    } else if (normalizedDataName.includes('certificado de extravío')) {
        const blob = await pdf(<TRAMITE_Extravio data={data} />).toBlob();
        formData.append("certificado", blob, `${data.name}.pdf`);
    } else if (normalizedDataName.includes('certificado de domicilio')) {
        const blob = await pdf(<TRAMITE_Domicilio data={data} />).toBlob();
        formData.append("certificado", blob, `${data.name}.pdf`);
    }
    
    formData.append("status", 'resuelto');
    axios.patch(`http://127.0.0.1:8000/api/claim-case/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        toast.success('Trámite aprobado exitosamente');
      })
      .catch(error => {
        toast.danger('Error al aprobar el certificado');
      });
  }

  useEffect(() => {
    const fetchCase = (id) => {
      axios.get(`http://localhost:8000/api/get-case/${id}/`)
        .then(response => {
          setTramite(response.data);
          const today = new Date();
          const year = today.getFullYear(); // Obtiene el año actual

          // Formatea la fecha actual como "YYYY-MM-DD"
          const formattedToday = today.toISOString().split('T')[0];

          setData({
            name: response.data.tramite.name,
            solicitante: response.data.solicitante.name,
            year: year,
            dni: response.data.solicitante.number,
            today: formattedToday,
            entity: response.data.entidad_solicitante,
          });
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        })
      console.log(tramite);
    }
    fetchCase(id)
  }, [])

  return (
    <Container fluid>
      <div className="my-3 p-3" style={{ background: "#e8edf7", borderRadius: "10px" }}>
        <Row className='align-items-center'>
          <Col xs={6} className='d-flex justify-content-start'>
            <MDBBtn floating size='lg' style={{ background: "#114b72" }} onClick={onBack}>
              <MDBIcon fas icon="arrow-circle-left" size='2x' />
            </MDBBtn>
          </Col>
          <Col xs={6} className='d-flex justify-content-end'>
            <h5 className='mb-0'>#{tramite.id}</h5>
          </Col>
        </Row>

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

        {tramitesInfoFam.includes(id) && (
          <>
          <Row className='mt-3 align-items-center'>
            <Col md={12}>
              <h6>Datos familiares</h6>
              <hr style={{ color: "black" }} />
            </Col>
            <Col md={4} className='d-flex justify-content-start'>
              <p className='mx-3'>¿Madre vive?</p>
              <MDBRadio name='madre_vive' value='true' label='Si' inline required/>
              <MDBRadio name='madre_vive' value='false' label='No' inline />
            </Col>
            <Col md={4}>
              <MDBInput
                type='text'
                label='Nombre y apellido'
                className='custom-input'
                value={tramite?.nombre_madre || ''}
                name='nombre_madre'
                readOnly
              />
            </Col>
          </Row>
          
          <Row className='mt-3 align-items-center'>
            <Col md={4} className='d-flex justify-content-start'>
              <p className='mx-3'>¿Padre vive?</p>
              <MDBRadio name='padre_vive' value='true' label='Si' inline required />
              <MDBRadio name='padre_vive' value='false' label='No' inline />
            </Col>
            <Col md={4}>
              <MDBInput
                type='text'
                label='Nombre y apellido'
                className='custom-input'
                value={tramite?.nombre_padre || ''}
                name='nombre_madre'
                readOnly
              />
            </Col>
          </Row>

          <Row className='mt-3 align-items-center'>
            <Col md={4} className='d-flex justify-content-center'>
              <MDBInput
                type='text'
                label='Número de hijos'
                className='custom-input'
                value={tramite?.numero_hijos || ''}
                name='nombre_madre'
                readOnly
              />
            </Col>
            <Col md={4}>
              <MDBInput
                type='text'
                label='Entidad solicitante'
                className='custom-input'
                value={tramite?.entidad_solicitante || ''}
                name='nombre_madre'
                readOnly
              />
            </Col>
          </Row>
          </>
        )}

        <Row className='mt-4'>
          <Col md={12}>
            <h6>Fotos del documento</h6>
            <hr style={{ color: "black" }} />
          </Col>
          <Col md={12} xl={6} className='d-flex justify-content-md-center mb-3'>
            <img src={tramite?.dni_frente} alt="DNI Frente" width="95%" height="300px" style={{ borderRadius: '10px' }} />
          </Col>
          <Col md={12} xl={6} className='d-flex justify-content-xl-end justify-content-md-center'>
            <img src={tramite?.dni_dorso} alt="DNI Frente" width="95%" height="300px" style={{ borderRadius: '10px' }} />
          </Col>
        </Row>
      </div>

      <div className="mb-3" style={{ background: "#e8edf7", borderRadius: "10px" }}>
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
        <PDFViewer style={{ width: '100%', height: '90vh', borderRadius: '10px' }}>
          <TRAMITE_Pdf />
        </PDFViewer>
      ) : (
        <>
          <Row>
            <Col md={6} className='mb-3'>
              <div className="d-grid gap-2">
                <MDBBtn color='danger'>Rechazar solicitud</MDBBtn>
              </div>
            </Col>
            <Col md={6} className='mb-3'>
              <div className="d-grid gap-2">
                <MDBBtn color='success' onClick={generatePdf}>Generar certificado</MDBBtn>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default TASK_Details