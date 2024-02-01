import React from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MDBIcon, MDBInput, MDBInputGroup, MDBBtn } from "mdb-react-ui-kit";
import { useForm } from "react-hook-form"; //LIBRERIA PARA MANERJAR EL FORMULARIO
import axios from "axios";

export function SignupPolice() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm(); //LLAMO A LAS PROPIEDADES DE LA LIBRERIA

  //funcion para capturar los valores
  const customSubmit = async (postData) => {
    console.log(postData);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/register/",
        postData
      );
      alert("El Usuario fue creado correctamente");
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div id="signup-container">
      <Container className="d-flex justify-content-center">
        <div id="signup-card" className="p-4">
          <form onSubmit={handleSubmit(customSubmit)}>
            <Row>
              <Col
                md="12"
                className="d-flex justify-content-center"
              >
                <h2 id="signup-title">
                  <MDBIcon fas icon="user-tie" size="2x" className="mx-3" />
                  Crear Nuevo Usuario
                </h2>
              </Col>
            </Row>

            <Row className="my-4">
              <Col>
                <MDBInput
                  className="custom-input"
                  label="Nombre"
                  type="text"
                  {...register("Nombre", { required: true })} //ES LA FORMA CON QUE SE VAN A REGISTRAR LOS VALORES DEL INPUT, REMPLAZA AL ID
                />
                {errors.Nombre && <small className="alertTitle">El campo no puede estar vacio</small>}
              </Col>
              <Col>
                <MDBInput
                  className="custom-input"
                  label="Apellido"
                  type="text"
                  {...register("Apellido", { required: true })}
                />
                {errors.Apellido && (
                  <small className="alertTitle">El campo no puede estar vacio</small>
                )}
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <MDBInput
                  className="custom-input"
                  label="Dni N°"
                  type="text"
                  {...register("Documento", { required: true, minLength: 8 })}
                />
                {errors.Documento?.type === "required" && (
                  <small className="alertTitle">El campo no puede estar vacio</small>
                )}
                {errors.Documento?.type === "minLength" && (
                  <small className="alertTitle">Ingrese la cantidad de caracteres validos (08)</small>
                )}
              </Col>
              <Col>
                <MDBInput
                  className="custom-input"
                  label="Legajo N°"
                  type="text"
                  {...register("Legajo", { required: true, minLength: 5 })}
                />
                {errors.Legajo?.type === "required" && (
                  <small className="alertTitle">El campo no puede estar vacio</small>
                )}
                {errors.Legajo?.type === "minLength" && (
                  <small className="alertTitle">Ingrese la cantidad de caracteres validos (05)</small>
                )}
              </Col>
            </Row>

            <Row className="my-4">
              <Col xl={8}>
                <MDBInput
                  className="custom-input"
                  label="Direccion - Calle"
                  type="text"
                  {...register("DireccionCalle", { required: true })}
                />
                {errors.DireccionCalle?.type === "required" && (
                  <small className="alertTitle">El campo no puede estar vacio</small>
                )}
              </Col>
              <Col xl={2}>
                <MDBInput
                  className="custom-input"
                  label="Numero"
                  type="text"
                  {...register("DireccionNumero", { required: true })}
                />
                {errors.DireccionNumero?.type === "required" && (
                  <small className="alertTitle">El campo no puede estar vacio</small>
                )}
              </Col>
              <Col xl={2}>
                <MDBInput
                  className="custom-input"
                  label="Piso-Dpto"
                  type="text"
                  {...register("Direccion-piso")}
                />
              </Col>
            </Row>

            <Row className="my-4">
              <Col>
                <MDBInput
                  className="custom-input"
                  label="Telefono N°"
                  type="text"
                  {...register("Telefono", { required: true })}
                />
                {errors.Telefono?.type === "required" && (
                  <small className="alertTitle">El campo no puede estar vacio</small>
                )}
              </Col>
              <Col>
                <MDBInput
                  className="custom-input"
                  label="Fecha de Nacimiento"
                  type="text"
                  placeholder="dd/mm/aaaa"
                  {...register("Nacimiento", { required: true })}
                />
                {errors.Nacimiento?.type === "required" && (
                  <small className="alertTitle">El campo no puede estar vacio</small>
                )}
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <select className="form-select" aria-label="Default select example" {...register("Jerarquia", { required: true })}>
                  <option value="Ayudante">Ayudante</option>
                  <option value="Subinspector">Subinspector</option>
                  <option value="Inspector">Inspector</option>
                  <option value="Agente">Agente</option>
                  <option value="Cabo">Cabo</option>
                  <option value="Cabo Primero">Cabo Primero</option>
                  <option value="Sargento">Sargento</option>
                  <option value="Sargento Primero">Sargento Primero</option>
                </select>
              </Col>
              
              <Col>
              <select className="form-select" aria-label="Default select example" {...register("Dependencia")}>
                  <option value="Investigaciones">Investigaciones</option>
                  <option value="Comisaria Primera">Comisaria Primera</option>
                  <option value="Comisaria Segunda">Comisaria Segunda</option>
                  <option value="Comisaria Tercera">Comisaria Tercera</option>
                  <option value="Comisaria Cuarta">Comisaria Cuarta</option>
                  <option value="Comisaria Quinta">Comisaria Quinta</option>
                </select>
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <MDBInputGroup noWrap textBefore="@">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Correo Electonico"
                    {...register("Correo", { required: true })}
                  />
                  {errors.Correo?.type === 'required' && <small className="alertTitle">El campo no puede estar vacio</small>}
                </MDBInputGroup>
              </Col>
            </Row>

            <Row>
              <Col md="6" className="mb-3">
                <MDBInput
                  label="Contraseña"
                  type="password"
                  className="custom-input"
                  {...register("Password", { required: true, minLength: 8 })}
                />
                {errors.Password?.type === "required" && (
                  <small className="alertTitle">El campo no puede estar vacio</small>
                )}
                {errors.Password?.type === "minLength" && (
                  <small className="alertTitle"> Ingrese la cantidad de caracteres validos (08)</small>
                )}
              </Col>
              <Col md="6" className="mb-3">
                <MDBInput
                  label="Confirmar contraseña"
                  type="password"
                  className="custom-input"
                  {...register("ConfirmationPassword", {
                    required: {
                      value: true,
                      message: "Este campo no puede estar vacio",
                    },
                    validate: (value) => {
                      if (value === watch("Password")) {
                        return true;
                      } else return "Las constraseñas no coninciden";
                    },
                  })}
                />
                {errors.ConfirmationPassword && (
                  <small className="alertTitle">{errors.ConfirmationPassword.message}</small>
                )}
              </Col>
            </Row>

            <Row className="my-3">
              <Col className="d-flex justify-content-center">
                <MDBBtn className="d-flex justify-content-center " color="success" type="submit">
                  <MDBIcon fas icon="check-circle" size="2x" className="mx-3" />
                  <span className="mb-0">Registrar Nuevo Usuario</span>
                </MDBBtn>
              </Col>
            </Row>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default SignupPolice;
