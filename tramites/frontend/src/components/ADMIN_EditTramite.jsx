import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { MDBInput, MDBTextArea, MDBInputGroup, MDBCheckbox, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import axios from 'axios';
import { toast } from "react-toastify";

const ADMIN_EditTramite = ({ id }) => {
  const navigate = useNavigate();
  const [hasChanged, setChanged] = useState(false);
  const [requirements, setRequirements] = useState([]);
  const [tramite, setTramite] = useState();
  const [formdata, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    time_limit: "",
    requirement: "",
  });

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

  // Obtengo los datos del trámite
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get-tramite/${id}/`);
        const res = response.data;

        if (response.status === 200) {
          setTramite(res)
          setFormData({
            name: res.name || "",
            description: res.description || "",
            price: res.price || "",
            time_limit: res.time_limit || "",
            requirement: res.requirement || "",
          })
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const handleFormData = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
    setChanged(true);
  };

  const handleCheckboxChange = (e) => {
    const reqId = parseInt(e.target.value);
    const updatedRequirements = formdata.requirement.includes(reqId)
      ? formdata.requirement.filter((id) => id !== reqId)
      : [...formdata.requirement, reqId];
  
    setFormData({ ...formdata, requirement: updatedRequirements });
    setChanged(true);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.patch(`http://localhost:8000/api/update-tramite/${id}/`, formdata);

      if (response.status === 200) {
        toast.success("Se guardaron los cambios correctamente");
        navigate('/admin?tab=2');
      }
      else toast.error("Hubo un error al intentar modificar los datos del trámite, porfavor intentelo de nuevo");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container className="d-flex justify-content-center">
      <div id="signup-card" className="p-4 m-5">
        <Row>
          <Col
            md="12"
            className="d-flex justify-content-center text-align-center">
            <h2 style={{ color: "black" }}>Editar trámite</h2>
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
                  checked={formdata.requirement.includes(req.id)} 
                  onChange={handleCheckboxChange}
                  />
                </Col>
              ))}
            </Row>
          </fieldset>

          <Row className="d-flex mt-3">
            <div className="d-grid gap-2">
              <MDBBtn 
              disabled={!hasChanged}
              className={`d-flex justify-content-center align-items-center ${hasChanged ? '' : 'disabled'}`}
              type="submit" 
              color="success">
                Crear trámite
              </MDBBtn>
            </div>
          </Row>
        </form>
      </div>
    </Container>
  )
}

export default ADMIN_EditTramite