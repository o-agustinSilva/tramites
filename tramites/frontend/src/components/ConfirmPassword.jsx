import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const ConfirmPassword = () => {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [newpassword, setNewPassword] = useState({
    password: "",
    confirm_password: ""
  })

  const { password, confirm_password } = newpassword
  const data = {
    "password": password,
    "confirm_password": confirm_password,
    "uidb64": uid,
    "token": token,
  }

  const handleChange = (e) => {
    setNewPassword({ ...newpassword, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (data) {
      const res = await axiosInstance.patch('/set-new-password/', data)
      const response = res.data
      if (res.status === 200) {
        navigate('/login')
        toast.success(response.message)
      }
      console.log(response)
    }

  }

  return (
    <div id="forgetpassword-container">
      <Container className="d-flex justify-content-center">
        <div id="forgetpassword-card" className="p-4">
          <Row>
            <Col
              md="12"
              className="d-flex justify-content-center text-align-center mt-1"
            >
              <h3 className="mb-4">Cambio de clave</h3>
            </Col>
          </Row>
          <form className="signup-form" onSubmit={handleSubmit}>
            <Row>
              <Col md="12" className="mb-4">
                <MDBInput
                  label="Nueva contraseña"
                  id="newPassword"
                  type="password"
                  className="custom-input"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md="12" className="mb-4">
                <MDBInput
                  label="Confirmar contraseña"
                  id="confirmPassword"
                  type="password"
                  className="custom-input"
                  name="confirm_password"
                  value={confirm_password}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="d-flex mt-3">
              <div className="d-grid gap-2">
                <MDBBtn type="submit" color="info">
                  Confirmar
                </MDBBtn>
              </div>
            </Row>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default ConfirmPassword