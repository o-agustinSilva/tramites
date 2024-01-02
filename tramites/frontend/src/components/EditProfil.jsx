import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { MDBIcon } from "mdb-react-ui-kit";
import { MDBBtn } from "mdb-react-ui-kit";

export function EditProfil() {
  return (
    <Container className="my-3" >
      <Row className="boxRow">
        <Col xl={2} sm={12} className="logoPerfil">
          <MDBIcon fas icon="user-edit" size="5x" />
          <h2>Editar Perfil</h2>
        </Col>
       
        <Col
          xl={10} 
        >
          <form>
            <Row className="mt-3" g={3}>
              <Col xl={12}>
                  <label htmlFor="direccion" className="optionTitle">
                    Direccion
                  </label>
                  <input
                    type="text"
                    id="direccion"
                    placeholder="Nueva Direccion"
                    className=" form-control inputEdit"
                  />
                
              </Col>
            </Row>

            <Row>
              <Col xl={12} >
                  <label htmlFor="telefono" className="optionTitle ">
                    Telefono
                  </label>
                  <input
                    type="text"
                    id="telefono"
                    placeholder="Nuevo Numero Telefonico"
                    className=" form-control inputEdit"
                  />
              </Col>
            </Row>

            <Row>
              <Col xl={12} >
              
                  <label htmlFor="correo" className="optionTitle ">
                    Correo Electronico
                  </label>
                  <input
                    type="text"
                    id="correo"
                    placeholder="Nueva Direccion Electonica"
                    className=" form-control inputEdit"
                  />
             
              </Col>
            </Row>
            <div className="butonEdit">
              <MDBBtn type="submit" className="me-2" color="success">
                Guardar Cambios
              </MDBBtn>
            </div>
          </form>
        </Col>
      </Row>
    </Container>

  );
}

export default EditProfil;
