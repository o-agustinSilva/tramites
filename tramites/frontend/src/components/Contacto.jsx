import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

import axios from "axios";

function Contacto() {
  const [dependencias, setDependencias] = useState([]);

  useEffect(() => {
    const fetchDependeces = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/get-dependences/"
        );
        const res = response.data;
        if (response.status === 200) setDependencias(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDependeces();
  }, []);

  return (
    <Container>
      <Row className="my-3">
        <Col >
          <h2 style={{ color: "black" }} className="text-center">COMISARIAS DE USHUAIA</h2>
        </Col>
      </Row>

      <Row className="my-3 d-flex justify-content-center p-3">
        {dependencias.length > 0 ? (
          dependencias.map((dependencia, index) => (

            <Col sm={12} md={6} xl={4} className="mb-5" key={index}>
              <MDBCard>
                <MDBRow className="g-0" style={{backgroundColor:"#e8edf7", boxShadow: "0 1px 40px rgba(0, 0, 0, 0.253)" }}>
                  <MDBCol xs="4" sm="4" md="4" style={{ maxWidth: '100%' }}>
                    <MDBCardImage
                      src={`http://localhost:8000${dependencia.imagen}`}
                      fluid
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                  </MDBCol>
                  <MDBCol xs="8" sm="8" md="8">
                    <MDBCardBody>
                      <MDBCardTitle>{dependencia.name}</MDBCardTitle>
                      <MDBCardText>{dependencia.address}</MDBCardText>
                      <MDBCardText>{dependencia.phone}</MDBCardText>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>

            </Col>

          )
          )
        ) : (
          <Row>
            <Col className="d-flex justify-content-center">
              <p>Cargando dependencias...</p>
            </Col>
          </Row>
        )}
      </Row>
    </Container>
  );
}

export default Contacto;
