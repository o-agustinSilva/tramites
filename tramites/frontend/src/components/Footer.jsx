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
      <section className="p-3">
        <MDBContainer className="my-2">
          <MDBRow>
            <MDBCol md="12" lg={8} className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4" style={{ color: "#D2D81D" }}>
                Policia de Tierra del Fuego
              </h6>
              <p>Al servicio de nuestra comunidad</p>
            </MDBCol>

            <MDBCol md="12" lg={4} className="d-flex flex-column justify-content-end">
              <h6 className="text-uppercase fw-bold mb-4" style={{ color: "#D2D81D" }}>
                Contacto
              </h6>

              <p>
                <MDBIcon icon="home" className="me-3" />
                Jefatura de Policia
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                policia@tierradelfuego.gov.ar
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" />+54 2901 421-773
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </MDBFooter>
  );
}
