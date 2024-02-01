import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
} from "mdb-react-ui-kit";

export function AdminTab() {
  const [activeTab, setActiveTab] = useState("1");

  const cambiarTab = (numeroTab) => {
    if (activeTab !== numeroTab) {
      setActiveTab(numeroTab);
    }
  };

  return (
    <Container className="my-4">
      <Nav tabs defaultActiveKey="1">
        <NavItem className="d-flex flex-row text-aling-center">
          <NavLink
            className={activeTab == "1" ? "activeTab baseTab" : "baseTab"}
            onClick={() => cambiarTab("1")}
          >
            <MDBIcon fas tabIndex="-1" icon="user-friends" size="1x" className="mx-2" />
            Gestion de Usuarios
          </NavLink>

          <NavLink
            className={activeTab == "2" ? "activeTab baseTab" : "baseTab mx-3"}
            onClick={() => cambiarTab("2")}
          >
            {" "}
            <MDBIcon fas icon="copy" size="1x" className="mx-2" />
            Gestion de Tramites
          </NavLink>

          <NavLink
            className={activeTab == "3" ? "activeTab baseTab" : "baseTab mx-3"}
            onClick={() => cambiarTab("3")}
          >
            {" "}
            <MDBIcon fas icon="chart-line" size="1x" className="mx-2" />
            Estadisitcas y Reportes
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent className="my-4">
        <TabPane eventKey="1" active={activeTab === "1"}>
          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Jerarquia</th>
                <th scope="col">Estado</th>
                <th scope="col">Dependencia</th>
                <th scope="col">Acciones</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">Daniel Herrera</p>
                      <p className="text-muted mb-0">daniHerrera@gmail.com</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1">Oficial Ayudante</p>
                </td>
                <td>
                  <MDBBadge color="success" pill>
                    Active
                  </MDBBadge>
                </td>
                <td>Comisaria Cuarta</td>
                <td>
                  <MDBBtn color="info" rounded size="sm">
                    <MDBIcon fas icon="edit" size="1x" className="mx-2" />
                    Editar
                  </MDBBtn>
                  <MDBBtn color="danger" rounded size="sm" className="mx-3">
                    <MDBIcon fas icon="trash-alt" size="1x" className="mx-2" />
                    Eliminar
                  </MDBBtn>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://mdbootstrap.com/img/new/avatars/6.jpg"
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">Luis Rojo</p>
                      <p className="text-muted mb-0">luisRojo@gmail.com</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1">Sargento</p>
                </td>
                <td>
                  <MDBBadge color="primary" pill>
                    Onboarding
                  </MDBBadge>
                </td>
                <td>Investigaciones</td>
                <td>
                  <MDBBtn color="info" rounded size="sm">
                    <MDBIcon fas icon="edit" size="1x" className="mx-2" />
                    Editar
                  </MDBBtn>
                  <MDBBtn color="danger" rounded size="sm" className="mx-3">
                    <MDBIcon fas icon="trash-alt" size="1x" className="mx-2" />
                    Eliminar
                  </MDBBtn>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://mdbootstrap.com/img/new/avatars/7.jpg"
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">Usuario Test</p>
                      <p className="text-muted mb-0">test@gmail.com</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1">Sargento 1°</p>
                </td>
                <td>
                  <MDBBadge color="warning" pill>
                    Awaiting
                  </MDBBadge>
                </td>
                <td>Comisaria Segunda</td>
                <td>
                  <MDBBtn color="info" rounded size="sm">
                    <MDBIcon fas icon="edit" size="1x" className="mx-2" />
                    Editar
                  </MDBBtn>
                  <MDBBtn color="danger" rounded size="sm" className="mx-3">
                    <MDBIcon fas icon="trash-alt" size="1x" className="mx-2" />
                    Eliminar
                  </MDBBtn>
                </td>
              </tr>
            </MDBTableBody>
          </MDBTable>
          <Link to="/registrePolice">
          <MDBBtn color="success" rounded size="sm" className="mx-3">
            <MDBIcon fas icon="plus-circle" size="2x" className="mx-3" />
            Nuevo Usuario
          </MDBBtn>
          </Link>
          <MDBBtn color="primary" rounded size="sm" className="mx-3">
          <MDBIcon fas icon="home" size="2x" className="mx-3" />
            Volver 
          </MDBBtn>

        </TabPane>

        <TabPane eventKey="2" active={activeTab === "2"}>
          <MDBTable className="table table-striped">
            <MDBTableHead light>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Codigo</th>
                <th scope="col">Dependencia</th>
                <th scope="col">Acciones</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <th scope="row">Certificado de Domicilio</th>
                <td>0252</td>
                <td>Comisaria</td>
                <td>
                  <MDBBtn color="info" rounded size="sm">
                    <MDBIcon fas icon="edit" size="1x" className="mx-2" />
                    Editar
                  </MDBBtn>
                  <MDBBtn color="danger" rounded size="sm" className="mx-3">
                    <MDBIcon fas icon="trash-alt" size="1x" className="mx-2" />
                    Eliminar
                  </MDBBtn>
                </td>
              </tr>
              <tr>
                <th scope="row">Cerificado de Buena Conducta</th>
                <td>0251</td>
                <td>Investigaciones</td>
                <td>
                  <MDBBtn color="info" rounded size="sm">
                    <MDBIcon fas icon="edit" size="1x" className="mx-2" />
                    Editar
                  </MDBBtn>
                  <MDBBtn color="danger" rounded size="sm" className="mx-3">
                    <MDBIcon fas icon="trash-alt" size="1x" className="mx-2" />
                    Eliminar
                  </MDBBtn>
                  
                </td>
              </tr>
              <tr>
                <th scope="row">Certificado de Extravio</th>
                <td>0235</td>
                <td>Comisaria</td>
                <td>
                  <MDBBtn color="info" rounded size="sm">
                    <MDBIcon fas icon="edit" size="1x" className="mx-2" />
                    Editar
                  </MDBBtn>
                  <MDBBtn color="danger" rounded size="sm" className="mx-3">
                    <MDBIcon fas icon="trash-alt" size="1x" className="mx-2" />
                    Eliminar
                  </MDBBtn>
                  
                </td>
              </tr>
            </MDBTableBody>
          </MDBTable>
          <Link to="/newTramite">
          <MDBBtn color="success" rounded size="sm" className="mx-3">
            <MDBIcon fas icon="plus-circle" size="1x" className="mx-3" />
            Nuevo Tramite 
          </MDBBtn>
          </Link>
          <MDBBtn color="primary" rounded size="sm" className="mx-3">
          <MDBIcon fas icon="home" size="1x" className="mx-3" />
            Volver 
          </MDBBtn>
        </TabPane>

        <TabPane eventKey="3" active={activeTab === "3"}>
          Contenido de Estadísticas y Reportes
        </TabPane>
      </TabContent>
    </Container>
  );
}

export default AdminTab;
