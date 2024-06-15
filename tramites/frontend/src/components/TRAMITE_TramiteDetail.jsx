import React, { useState, useEffect, useRef } from 'react';
import TRAMITE_Comprobante from './TRAMITE_Comprobante';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  MDBBtn,
  MDBIcon,
  MDBInput,
} from 'mdb-react-ui-kit';

const TRAMITES_TramiteDetail = ({ id }) => {
  const [tramite, setTramite] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/api/get-case/${id}/`)
      .then(response => {
        if (response.status === 200) {
          setTramite(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const handleDownloadClick = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = decodeURIComponent(url.split('/').pop()); // Decodifica el nombre del archivo
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
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
          <Col md={4} className='mb-3'>
            <MDBInput
              type='text'
              label='Trámite'
              className='custom-input'
              value={tramite?.tramite?.name || ''}
              name='name'
              readOnly
            />
          </Col>
          <Col md={4} className='mb-3'>
            <MDBInput
              type='date'
              label='Fecha de solicitud'
              className='custom-input'
              value={tramite?.request_date || ''}
              name='request_date'
              readOnly
            />
          </Col>
          <Col md={4} className='mb-3'>
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
          <Col md={6} className='mb-3'>
            <img src={tramite?.dni_frente} alt="DNI Frente" width="100%" height="300px" style={{ borderRadius: '10px' }} />
          </Col>
          <Col md={6} className='mb-3'>
            <img src={tramite?.dni_dorso} alt="DNI Dorso" width="100%" height="300px" style={{ borderRadius: '10px' }} />
          </Col>
        </Row>

        <Row className='mt-4'>
          <Col md={12}>
            <h6>Certificado y comprobante de pago</h6>
            <hr style={{ color: "black" }} />
          </Col>
          <Col md={6} className='mb-3'>
            {tramite.certificado &&
              <div className="d-grid gap-2">
                <MDBBtn color="success" className='tableButton' onClick={handleDownloadClick}>
                  <MDBIcon fas icon="arrow-circle-down" size="2x" />
                  <span className="mx-3">Descargar certificado</span>
                </MDBBtn>
              </div>
            }
          </Col>

          <Col md={6} className='mb-3'>
            {tramite.certificado &&
              <div className="d-grid gap-2">
                <MDBBtn color="success" className='tableButton' onClick={handleDownloadClick}>
                  <MDBIcon fas icon="arrow-circle-down" size="2x" />
                  <span className="mx-3">Descargar comprobante</span>
                </MDBBtn>
              </div>
            }
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default TRAMITES_TramiteDetail;
