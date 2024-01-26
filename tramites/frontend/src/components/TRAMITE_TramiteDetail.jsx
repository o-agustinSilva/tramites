import React, { useState } from 'react';
import TRAMITE_Comprobante from './TRAMITE_Comprobante';
import TRAMITE_Pdf from '../pdf/TRAMITE_Pdf';
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';
import {
  MDBBtn,
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';

const TRAMITES_TramiteDetail = () => {
  const [justifyActive, setJustifyActive] = useState('tab1');
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
            <MDBBtn floating size='lg' style={{background:"#114b72"}}>
              <MDBIcon fas icon="arrow-circle-left" size='2x' />
            </MDBBtn>
          </Link>
        </Col>
        <Col xs={6} className='d-flex justify-content-end'>
          <h5 className='mb-0'>#000012389123</h5>
        </Col>
      </Row>

      <div className="mb-5" style={{ background: "#e8edf7", borderRadius: "10px"}}>
        <Row className='mt-3 align-items-center'>
          <Col md={12} >
            <MDBTabs justify>
              <MDBTabsLink
                onClick={() => handleJustifyClick('tab1')}
                active={justifyActive === 'tab1'}
                className={` ${justifyActive === "tab1" ? "activeTab" : ""} baseTab d-flex justify-content-center align-items-center`}
                style={{ borderTopLeftRadius: "10px" }}>
                <MDBIcon far icon="file-alt" size="2x" className="me-2 align-self-center" />
                <span className="mb-0">Certificado</span>
              </MDBTabsLink>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}
                  className={` ${justifyActive === "tab2" ? "activeTab" : ""} baseTab d-flex justify-content-center align-items-center`}
                  style={{ borderTopRightRadius: "10px" }}>
                  <MDBIcon fas icon="credit-card" size='2x' className="me-2 align-self-center" />
                  <span className='mb-0'>Comprobante de pago</span>
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>
          </Col>
        </Row>

        <MDBTabsContent>
          <MDBTabsPane open={justifyActive === 'tab1'} className='d-flex justify-content-center mt-3 pb-4'>
            <PDFViewer style={{ width: "80%", height:"90vh" ,borderRadius:"10px"}} >
              <TRAMITE_Pdf />
            </PDFViewer>
          </MDBTabsPane>
          <MDBTabsPane open={justifyActive === 'tab2'}>
            <TRAMITE_Comprobante />
          </MDBTabsPane>
        </MDBTabsContent>
      </div>
    </Container>
  )
}

export default TRAMITES_TramiteDetail