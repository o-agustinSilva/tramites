import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";


export function Inicio(){
 return(
     <Container fluid className="fondoInicio">
       <Row className="justify-content-end ">
       <Col xl={6}>
               <h1 id="titulo-inicio" >Sistema de trámites Policia de Tierra del Fuego</h1>
        </Col>  
       </Row>
     </Container>
 );
}

export default Inicio;