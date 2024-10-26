import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MDBIcon, MDBInput, MDBInputGroup, MDBBtn } from "mdb-react-ui-kit";
import { useForm } from "react-hook-form"; //LIBRERIA PARA MANERJAR EL FORMULARIO
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function SignupPolice() {
  const navagate= useNavigate();
  const [dependences, setDependences] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();  //LLAMO A LAS PROPIEDADES DE LA LIBRERIA

  // Obtengo todas las dependencias para completar el dropdown
  useEffect(() => {
    const fetchDependences = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/get-dependences/");
        const res = response.data;

        if (response.status === 200) setDependences(res);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDependences();
  }, []);



  //funcion para capturar los valores
  const customSubmit = async (postData) => {
    console.log(postData);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/registerPolicia/",
        postData
      );

      if(res.status == 201){
        toast.success("El Usuario fue creado correctamente");
        navagate("/admin");
      }
      
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
            <Col md={12}> 
               <h6>Datos Personales</h6> 
               <hr style={{color:'black'}}/>
            </Col>
        
              <Col md={6}>
                <MDBInput
                  className="custom-input"
                  label="Nombre"
                  type="text"
                  {...register("firstname", { required: true })} //ES LA FORMA CON QUE SE VAN A REGISTRAR LOS VALORES DEL INPUT, REMPLAZA AL ID
                />
                {errors.firstname && <small className="alertTitle">El campo no puede estar vacio</small>}
              </Col>
              <Col md={6}>
                <MDBInput
                  className="custom-input"
                  label="Apellido"
                  type="text"
                  {...register("lastname", { required: true })}
                />
                {errors.lastname && (
                  <small className="alertTitle">El campo no puede estar vacio</small>
                )}
              </Col>
            </Row>
            <Row className="my-4">
              <Col md={6}>
                <MDBInput
                  className="custom-input"
                  label="Dni N°"
                  type="number"
                  {...register("number", { required: true, minLength: 8 })}
                />
                {errors.number?.type === "required" && (
                  <small className="alertTitle">El campo no puede estar vacio</small>
                )}
                {errors.number?.type === "minLength" && (
                  <small className="alertTitle">Ingrese la cantidad de caracteres validos (08)</small>
                )}
              </Col>
              <Col md={6}>
                <MDBInput
                  className="custom-input"
                  label="Legajo N°"
                  type="number"
                  {...register("legajo_number", { required: true, minLength: 5 })}
                />
                {errors.legajo_number?.type === "required" && (
                  <small className="alertTitle">El campo no puede estar vacio</small>
                )}
                {errors.legajo_number?.type === "minLength" && (
                  <small className="alertTitle">Ingrese la cantidad de caracteres validos (05)</small>
                )}
              </Col>
              {/* <Col>
                <MDBInput
                  className="custom-input"
                  label="Rol"
                  defaultValue="Policia"
                  type="text"
                  {...register("role", { required: true, value: 'police'})}
                />
              </Col> */}
            </Row>

            <Row>
            {/* <Col md={6} className="mb-3">
              <Form.Select
                name="genre"
                // value={formdata.genre}
                // onChange={handleFormData}
                {...register("genre", { required: true })}
              >
                <option value="" disabled>
                  Género
                </option>
                <option value="male">Hombre</option>
                <option value="female">Mujer</option>
              </Form.Select>
            </Col> */}
            
            <Col md={6}>
                <MDBInput
                  className="custom-input"
                  label="Fecha de Nacimiento"
                  type="text"
                  placeholder="dd/mm/aaaa"
                  {...register("birthdate", { required: true })}
                />
                {errors.birthdate?.type === "required" && (
                  <small className="alertTitle">El campo no puede estar vacio</small>
                )}
              </Col>          
            </Row>

          <Row className="my-4">
          <Col md={12}> 
               <h6>Domicilio</h6> 
               <hr style={{color:'black'}}/>
            </Col>

              <Col md={6}>
                <MDBInput
                  className="custom-input"
                  label="Direccion - Calle"
                  type="text"
                  {...register("address", { required: true })}
                />
                {errors.address?.type === "required" && (
                  <small className="alertTitle">El campo no puede estar vacio</small>
                )}
              </Col>
              <Col md={3}>
                <MDBInput
                  className="custom-input"
                  label="Numero"
                  type="text"
                  {...register("address_number", { required: true })}
                />
                {errors.address_number?.type === "required" && (
                  <small className="alertTitle">El campo no puede estar vacio</small>
                )}
              </Col>
              <Col md={3}>
                <MDBInput
                  className="custom-input"
                  label="Piso-Dpto"
                  type="text"
                  {...register("floor")}
                />
              </Col>
            </Row>
            
            <Row className="my-4">
            <Col md={12}> 
               <h6>Datos Laborales</h6> 
               <hr style={{color:'black'}}/>
            </Col>

              <Col>
                <select className="form-select" aria-label="Default select example" {...register("hierarchy", { required: true })}>
                  <option value="ayudante">Ayudante</option>
                  <option value="subinspector">Subinspector</option>
                  <option value="inspector">Inspector</option>
                  <option value="agente">Agente</option>
                  <option value="cabo">Cabo</option>
                  <option value="cabo primero">Cabo Primero</option>
                  <option value="sargento">Sargento</option>
                  <option value="sargento primero">Sargento Primero</option>
                </select>
              </Col>
              
              <Col>
              <select className="form-select" aria-label="Default select example" {...register("dependence", { required: true })}>
                  {dependences.map((dependence) => (
                    <option key={dependence.id} value={dependence.id}>
                      {dependence.name}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>

            <Row className="my-3">
            <Col md={12}> 
               <h6>Datos de Contacto</h6> 
               <hr style={{color:'black'}}/>
            </Col>
              <Col md={12}>
                <MDBInputGroup noWrap textBefore="@">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Correo Electonico"
                    {...register("email", { required: true })}
                  />
                  {errors.email?.type === 'required' && <small className="alertTitle">El campo no puede estar vacio</small>}
                </MDBInputGroup>
              </Col>
              
              <Row className="my-3">
              <Col md={6} >
                <MDBInput
                  className="custom-input"
                  label="Codigo Area"
                  type="text"
                  {...register("phone_area_code", { required: true })}
                />
                {errors.phone?.type === "required" && (
                  <small className="alertTitle">El campo no puede estar vacio</small>
                )}
              </Col>
        
              <Col md={6}>
                <MDBInput
                  className="custom-input"
                  label="Telefono N°"
                  type="text"
                  {...register("phone", { required: true })}
                />
                {errors.phone?.type === "required" && (
                  <small className="alertTitle">El campo no puede estar vacio</small>
                )}
              </Col>
             </Row>

            </Row>

            <Row>
              <Col md="6" className="mb-3">
                <MDBInput
                  label="Contraseña"
                  type="password"
                  className="custom-input"
                  {...register("password", { required: true, minLength: 8 })}
                />
                {errors.password?.type === "required" && (
                  <small className="alertTitle">El campo no puede estar vacio</small>
                )}
                {errors.password?.type === "minLength" && (
                  <small className="alertTitle"> Ingrese la cantidad de caracteres validos (08)</small>
                )}
              </Col>
              <Col md="6" className="mb-3">
                <MDBInput
                  label="Confirmar contraseña"
                  type="password"
                  className="custom-input"
                  {...register("password_confirmation", {
                    required: {
                      value: true,
                      message: "Este campo no puede estar vacio",
                    },
                    validate: (value) => {
                      if (value === watch("password")) {
                        return true;
                      } else return "Las constraseñas no coninciden";
                    },
                  })}
                />
                {errors.password_confirmation && (
                  <small className="alertTitle">{errors.password_confirmation.message}</small>
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
