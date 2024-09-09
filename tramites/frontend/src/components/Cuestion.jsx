import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

function Cuestion(){
    return(
      <Container>
      <Row className='my-3'>
         <Col  className="d-flex justify-content-center">
            <h2 style={{ color:'black'}}>PREGUNTAS FRECUENTES</h2>
        </Col>
      </Row>
      
       <Row className='my-3'>
         <Col>
            <h4 style={{color:'black'}}> ¿Que tramites puedo realizar?</h4>
            <div>Los certificados que se pueden solictar son: 
                  <li>Certificado de Residencia.</li>
                  <li>Certificado de Extravio</li>
                  <li>Certificado de Domiclio</li>
                  <li>  Certificado de Buena Conducta</li>
            </div>
         </Col>
       </Row>

       <Row className='my-3'>
         <Col>
            <h4 style={{color:'black'}}> ¿Quienes pueden utilizar el sistema?</h4>
            <div>Las personas mayores de edad y redisidente en la ciudad de Ushuaia, podran hacer uso del sistema      
            </div>
         </Col>
       </Row>

       <Row className='my-3'>
         <Col>
            <h4 style={{color:'black'}}> ¿Que documentanción necesito para solicitar un certificado?</h4>
            <div>La documentación a presentar varia según el tramite: 
              <li>Certificado de Residencia: Fotos del DNI (ambos lados) y docuementacion que justifique los años en la provincia.</li>
              <li>Certificado de Extravio: Fotos del DNI (ambos lados)</li>
              <li>Certificado de Domicilio: Fotos del DNI (ambos lados)</li>
              <li>Certificado de Buena Conducta: Fotos del DNI (ambos lados)</li>
            </div>
         </Col>
       </Row>

       <Row className='my-3'>
         <Col>
            <h4 style={{color:'black'}}> ¿Validez del tramite?</h4>
            <div>Los tramites que se realicen mediante esta plataforma, tendran una validez a nivel provincial por el lapso de seis (06) meses desde la fecha de emisión.</div>
         </Col>
       </Row>

       <Row className='my-3'>
         <Col>
            <h4 style={{color:'black'}}> ¿Formato de la documentación?</h4>
            <div>Tanto las certificaciones emitidas, como los requisitos solicitados, tendrán un formato del tipo PDF.</div>
         </Col>
       </Row>

       <Row className='my-3'>
         <Col>
            <h4 style={{color:'black'}}> ¿Medios de pago?</h4>
            <div>Los tramites solicitados podrán ser abonado mediate la plataforma MercadoPago.</div>
         </Col>
       </Row>

       <Row className='my-3'>
         <Col>
            <h4 style={{color:'black'}}> ¿Tiempo de demora?</h4>
            <div>Los tramites solicitados seran tramitados durante las 48hs en los dias habiles, desde el momento de la solicitud.
            </div>
         </Col>
       </Row>


      </Container>

    )


}

export default Cuestion;