import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MDBInput, MDBTextArea, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export function FormNewTramite() {
  const { register, handleSubmit } = useForm();

  const customSubmit = (data) => {
    console.log(data);
  };

  return (
    <div id="signup-container">
      <Container
        className=" my-5"
        style={{
          background: "#e8edf7",
          // maxWidth: "1100px",
          borderRadius: "15px",
        }}
      >
        <Row className="my-3 p-2">
          <Col className="">
            <h2 id="signup-title">
              {" "}
              <MDBIcon
                fas
                icon="file-invoice"
                size="2x"
                className="mx-2"
              />{" "}
              Ingresar Nuevo Tramite
            </h2>
          </Col>
        </Row>

        <div className="p-3">
          <form onSubmit={handleSubmit(customSubmit)}>
            <Row>
              <Col className="mb-3">
                <MDBInput
                  label="NombreTramite"
                  type="text"
                  {...register("NombreTramite")}
                />
              </Col>
            </Row>

            <Row>
              <Col className="mb-3">
                <MDBInput
                  label="Descripcion"
                  type="text"
                  {...register("Descripcion")}
                />
              </Col>
            </Row>

            <Row>
              <Col className="mb-3">
                <MDBTextArea
                  label="Requisitos"
                  rows={4}
                  {...register("Requisitos")}
                />
              </Col>
            </Row>

            <Row className="my-3">
              <Col className="d-flex justify-content-start">
                <Link to='/admin'>
                <MDBBtn
                  className="d-flex align-items-center "
                  color="danger"
                >
                  <MDBIcon
                    fas
                    icon="arrow-circle-left"
                    size="2x"
                    className="mx-3"
                  />
                  <span className="mb-0">Volver</span>
                </MDBBtn>
                </Link>
              </Col>
              <Col className="d-flex justify-content-end">
                <MDBBtn
                  className="d-flex align-items-center "
                  color="success"
                  type="submit"
                >
                  <MDBIcon fas icon="check-circle" size="2x" className="mx-3" />
                  <span className="mb-0">Registrar Nuevo Tramite</span>
                </MDBBtn>
              </Col>
            </Row>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default FormNewTramite;
