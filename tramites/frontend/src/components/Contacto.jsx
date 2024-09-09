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
        console.log(res);

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
        <Col className="d-flex justify-content-center">
          <h2 style={{ color: "black" }}>COMISARIAS DE USHUAIA</h2>
        </Col>
      </Row>
       
      
      {dependencias.length > 0 ? (
        dependencias.map((dependencia, index) => (
          <Row className="my-3 d-flex justify-content-center" key={index}>
            <MDBCard style={{ maxWidth: "540px" }}>
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    src={`http://localhost:8000${dependencia.imagen}`}
                    alt="..." 
                    fluid
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle>{dependencia.name}</MDBCardTitle>
                    <MDBCardText>{dependencia.address}</MDBCardText>
                    <MDBCardText>{dependencia.phone}</MDBCardText>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </Row>
        ))
      ) : (
        <Row>
          <Col className="d-flex justify-content-center">
            <p>Cargando dependencias...</p>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Contacto;
