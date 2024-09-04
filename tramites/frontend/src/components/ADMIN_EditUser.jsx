import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { MDBInput, MDBInputGroup, MDBCheckbox, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import axios from 'axios';
import { toast } from "react-toastify";

const ADMIN_EditUser = ({ id }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [hasChanged, setChanged] = useState(false);
  const [dependences, setDependences] = useState([]);
  const [formdata, setFormData] = useState({
    firstname: "",
    lastname: "",
    number: "",
    email: "",
    role: "",
    document_type: "",
    dependence:"",
    hierarchy:"",
  });

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

  // Obtengo los datos del usuario
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get-user/${id}/`);
        const res = response.data;

        if (response.status === 200) {
          setUser(res)
          setFormData({
            firstname: res.firstname || "",
            lastname: res.lastname || "",
            number: res.number || "",
            email: res.email || "",
            role: res.role || "",
            document_type: res.document_type || "",
            dependence: res.dependence || "",
            hierarchy: res.hierarchy || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.patch(`http://localhost:8000/api/update-police/${id}/`, formdata);

      if (response.status === 200) {
        toast.success("Se guardaron los cambios correctamente");
        navigate('/admin?tab=1');
        
      }
      else toast.error("Hubo un error al intentar modificar los datos del usuario, porfavor intentelo de nuevo");
    } catch (err) {
      console.log(err);
    }
  }


  return (
      <Container className="d-flex justify-content-center">
        <div id="signup-card" className="p-4 m-5">
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md={12} className="d-flex justify-content-center">
                <h2>Editar usuario</h2>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col md={6} className='mb-3'>
                <MDBInput className="custom-input"
                  label="Nombre"
                  type="text"
                  name="firstname"
                  value={formdata.firstname}
                  onChange={handleFormData}
                />
              </Col>
              <Col md={6} className='mb-3'>
                <MDBInput className="custom-input"
                  label="Apellido"
                  type="text"
                  name="lastname"
                  value={formdata.lastname}
                  onChange={handleFormData} />
              </Col>
            </Row>
            <Row>
              <Col md={6} className='mb-3'>
                <select
                  className="form-select"
                  name="document_type"
                  value={formdata.document_type}
                  onChange={handleFormData}
                >
                  <option value="DNI">DNI</option>
                  <option value="LC">LC</option>
                  <option value="LE">LE</option>
                  <option value="PASAPORTE">PASAPORTE</option>
                  <option value="CDI">CDI</option>
                  <option value="CUIL">CUIL</option>
                  <option value="CUIT">CUIT</option>
                </select>
              </Col>
              <Col md={6} className='mb-3'>
                <MDBInput
                  className="custom-input"
                  label="Número"
                  type="number"
                  name="number"
                  value={formdata.number}
                  onChange={handleFormData} />
              </Col>
            </Row>

            <Row >
              <Col md={6} className='mb-3'>
                <select
                  className="form-select"
                  name="hierarchy"
                  value={formdata.hierarchy}
                  onChange={handleFormData}>
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

              <Col md={6} className='mb-3'>
                <select
                  className="form-select"
                  id="dependences"
                  name="dependence"
                  value={formdata.dependence}
                  onChange={handleFormData}
                >
                  {dependences.map((dependence) => (
                    <option key={dependence.id} value={dependence.name}>
                      {dependence.name}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
            <Row>
              <Col md={12} className='mb-3'>
                <MDBInputGroup noWrap textBefore="@">
                  <input className="form-control"
                    type="email"
                    placeholder="Correo Electonico"
                    name="email"
                    value={formdata.email}
                    onChange={handleFormData}
                  />
                </MDBInputGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mb-3">
                <select
                  className="form-select"
                  name="role"
                  value={formdata.role}
                  onChange={handleFormData}>
                  <option value="police">Policia</option>
                  <option value="admin">Administrador</option>
                </select>
              </Col>
            </Row>

            <Row className="d-flex mt-3">
              <div className="d-grid gap-2">
                <MDBBtn
                  disabled={!hasChanged}
                  className={`d-flex justify-content-center align-items-center ${hasChanged ? '' : 'disabled'}`}
                  type="submit"
                  color="success">
                  <MDBIcon fas icon="check-circle" size="2x" className="me-3" />
                  <span className="mb-0">Guardar cambios</span>
                </MDBBtn>
              </div>
            </Row>
          </form>
        </div>
      </Container>
  )
}

export default ADMIN_EditUser