import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import { MDBIcon } from "mdb-react-ui-kit";
import { MDBBtn } from "mdb-react-ui-kit";

export function PROFILE_Tramites() {
  const navigate = useNavigate();
  const refresh = JSON.parse(localStorage.getItem("refresh_token"));
  
  const handleLogout = async () => {
    const res = await axiosInstance.post("/logout/", {
      refresh_token: refresh,
    });

    if (res.status === 200) {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access");
      localStorage.removeItem("user");
      navigate("/login");
      toast.warn("logout successful");
    }
  };

  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col sm={12} xl={12} className="colProfile2">
            <h1>Mis trámites</h1>
            <Row>
              <Col>
                <div className="d-none d-sm-block">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Documento</th>
                        <th>Codigo</th>
                        <th>Dependencia</th>
                        <th>Fecha de Inicio</th>
                        <th>PDF</th>
                        <th>Comprobante</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Certificado de Recidencia</td>
                        <td>025</td>
                        <td>Investigaciones</td>
                        <td>25/01/2023</td>
                        <td>PDF</td>
                        <td>COMPROBANTE</td>
                      </tr>

                      <tr>
                        <td>Certificado de Domicilio</td>
                        <td>040</td>
                        <td>Comisaria 1ra</td>
                        <td>08/04/2023</td>
                        <td>PDF</td>
                        <td>COMPROBANTE</td>
                      </tr>

                      <tr>
                        <td>Certificado de Extravio</td>
                        <td>280</td>
                        <td>Comisaria 3ra</td>
                        <td>04/04/2023</td>
                        <td>PDF</td>
                        <td>COMPROBANTE</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Link to="/misTramites">
                  <MDBBtn color="info">Ver Mas</MDBBtn>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PROFILE_Tramites;
