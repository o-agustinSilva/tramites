import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function App() {
  return (
    <MDBFooter className='text-white' id="footer">
      <MDBContainer className="my-2">
        <MDBRow className="text-center text-md-start">
          <MDBCol md="2" lg="5" className="mt-4 mb-2">
            <h6 className="text-uppercase fw-bold mb-2" style={{ color: "#D2D81D" }}>
              Policia de Tierra del Fuego
            </h6>
            <p>Al servicio de nuestra comunidad</p>
          </MDBCol>

          <MDBCol md="10" lg="7" className="mt-4 mb-2">
            <h6 className="text-uppercase fw-bold mb-2" style={{ color: "#D2D81D" }}>
              Contacto
            </h6>
            <MDBRow>
              <MDBCol md="4" sm="12" className="d-flex justify-content-center justify-content-md-start align-items-center">
                <MDBIcon icon="home" className="me-2" />
                <span>Jefatura de Policia</span>
              </MDBCol>
              <MDBCol md="4" sm="12" className="d-flex justify-content-center align-items-center">
                <MDBIcon icon="envelope" className="me-2" />
                <span>policia@tierradelfuego.gov.ar</span>
              </MDBCol>
              <MDBCol md="4" sm="12" className="d-flex justify-content-center justify-content-md-end align-items-center">
                <MDBIcon icon="phone" className="me-2" />
                <span>+54 2901 421-773</span>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
}
