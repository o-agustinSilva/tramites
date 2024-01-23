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
      <MDBFooter
        bgColor="dark"
        className="text-center text-lg-start text-muted"
        id="footer"
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <MDBContainer className="text-center text-md-start my-2">
            <MDBRow className="mt-3">
              <MDBCol md="9" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Policia de Tierra del Fuego
                </h6>
                <p>Al servicio de nuestra comunidad</p>
              </MDBCol>

              <MDBCol md="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
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
