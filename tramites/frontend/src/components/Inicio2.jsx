import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  MDBAccordion,
  MDBAccordionItem,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

export function Inicio2() {
  const [tramites, setTramites] = useState([]);

  // Obtengo todos los trámites disponibles de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/get-tramites/");
        const res = response.data;


        if (response.status === 200) setTramites(res)
        
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  
  return (
    <Container className="mb-5">
      <Row className="my-5">
        <Col md={12} className="d-flex justify-content-center">
          <h2 style={{ color: "black" }}>Trámites disponibles</h2>
        </Col>
        <Col className="mt-2">
          <div className="linea"></div>
        </Col>
      </Row>

      <MDBAccordion borderless initialActive={1}>
        {tramites.map((tramite) => (
          <MDBAccordionItem
            key={tramite.id}
            collapseId={tramite.id}
            headerTitle={<span style={{ color: "black", fontSize: "20px" }}>{tramite.name}</span>}
          >
            <p>{tramite.description}</p>
            <div className="my-3">
              <Link to={`/requestTramite/${tramite.id}`}>
                <MDBBtn className="d-flex align-items-center" color="info">
                  <MDBIcon
                    fas
                    icon="file-signature"
                    size="2x"
                    style={{ marginRight: "10px" }}
                  />
                  <span className="mb-0">Iniciar Tramite</span>
                </MDBBtn>
              </Link>
            </div>
          </MDBAccordionItem>
        ))}
      </MDBAccordion>
    </Container>
  );
}

export default Inicio2;
