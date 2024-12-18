import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MDBInput, MDBTextArea, MDBCheckbox, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export function FormNewTramite() {
  const navigate = useNavigate();
  const [requirements, setRequirements] = useState([]);
  const [formdata, setFormdata] = useState({
    name: "",
    description: "",
    price: "",
    time_limit: "",
    requirement: [],
  });

  const handleFormData = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const reqId = e.target.value;
    const updatedSelectedRequirements = formdata.requirement.includes(reqId)
      ? formdata.requirement.filter((id) => id !== reqId)
      : [...formdata.requirement, reqId];
  
    setFormdata({ ...formdata, requirement: updatedSelectedRequirements });
  };

  // Obtengo todas las requisitos para completar el dropdown
  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/get-requirements/");
        const res = response.data;

        if (response.status === 200) setRequirements(res);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRequirements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formdata.requirement.length === 0) {
      toast.error("Debe seleccionar al menos un requisito.");
      return;
    }

    console.log(formdata);
    try {
      const response = await axios.post("http://localhost:8000/api/create-tramite/", formdata);
      const res = response.data;

      if (response.status === 201) {
        toast.success("Se creó el trámite correctamente");
        navigate('/admin?tab=2');
      } else 
        toast.error("Hubo un error al intentar crear el trámite, porfavor intentelo de nuevo");
    
      } catch (e) {
      console.log(e);
    }

    return
  }

  return (
    <Container className="d-flex justify-content-center">
      <div id="signup-card" className="p-4 m-5">
        <Row>
          <Col
            md="12"
            className="d-flex justify-content-center text-align-center">
            <h2 style={{ color: "black" }}>Nuevo trámite</h2>
          </Col>
        </Row>
        <form onSubmit={handleSubmit}>
          <Row className="d-flex justify-content-center mt-4">
            <Col md={12} className="mb-3">
              <MDBInput
                label="Nombre del trámite"
                type="text"
                className="custom-input"
                name="name"
                value={formdata.name}
                onChange={handleFormData}
                required
              />
            </Col>
            <Col md={12} className="mb-3">
              <MDBTextArea
                label="Descripción"
                type="text"
                className="custom-input"
                name="description"
                value={formdata.description}
                onChange={handleFormData}
                required
              />
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <MDBInput
                label="Precio"
                type="number"
                className="custom-input"
                name="price"
                value={formdata.price}
                onChange={handleFormData}
                required
              />
            </Col>
            <Col md={6} className="mb-3">
              <MDBInput
                label="Vigencia (en días)"
                type="number"
                className="custom-input"
                name="time_limit"
                value={formdata.time_limit}
                onChange={handleFormData}
                required
              />
            </Col>
          </Row>

          <fieldset style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', position: 'relative' }}>
            <legend style={{ position: 'absolute', top: '-12px', left: '10px', fontSize: "15px", background: "#e8edf7", width: "70px" }}>Requisitos</legend>
            <Row>
              {requirements.map((req) => (
                <Col md={6} key={req.id}>
                  <MDBCheckbox
                    value={req.id}
                    label={req.name}
                    onChange={handleCheckboxChange}
                  />
                </Col>
              ))}
            </Row>
          </fieldset>

          <Row className="d-flex mt-3">
            <div className="d-grid gap-2">
              <MDBBtn type="submit" color="success">
                Crear trámite
              </MDBBtn>
            </div>
          </Row>
        </form>
      </div>
    </Container>
  );
}

export default FormNewTramite;
