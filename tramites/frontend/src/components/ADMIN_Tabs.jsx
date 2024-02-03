import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ADMIN_Users from "./ADMIN_Users";
import ADMIN_Tramites from "./ADMIN_Tramites";
import Container from "react-bootstrap/esm/Container";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "react-bootstrap";
import { MDBIcon } from "mdb-react-ui-kit";

export function ADMIN_Tabs() {
  const [activeTab, setActiveTab] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const cambiarTab = (numeroTab) => {
    if (activeTab !== numeroTab) {
      setActiveTab(numeroTab);
      navigate(`?tab=${numeroTab}`);
    }
  };

  // Establece la pestaña activa basándose en la información de la URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabFromURL = searchParams.get("tab");
    
    // Si hay un tab en la URL, o si no hay uno almacenado en el estado local, usa el tab de la URL
    if (tabFromURL) {
      setActiveTab(tabFromURL);
    } else if (!activeTab) {
      // Si no hay un tab en la URL y no hay uno almacenado, establece el tab por defecto (en este caso, 1)
      setActiveTab("1");
      navigate(`?tab=1`);
    }
  }, [location.search, activeTab, navigate]);

  return (
    <Container className="my-4">
      <Nav tabs="true" defaultActiveKey="1">
        <NavItem className="d-flex flex-row text-aling-center">
          <NavLink
            className={activeTab == "1" ? "activeTab baseTab" : "baseTab"}
            onClick={() => cambiarTab("1")}
            style={{ borderRadius: "10px" }}
          >
            <MDBIcon fas tabIndex="-1" icon="user-friends" size="1x" className="mx-2" />
            Gestion de Usuarios
          </NavLink>

          <NavLink
            className={`${activeTab === "2" ? "activeTab baseTab" : "baseTab"} mx-3`}
            onClick={() => cambiarTab("2")}
            style={{ borderRadius: "10px" }}
          >
            {" "}
            <MDBIcon fas icon="copy" size="1x" className="mx-2" />
            Gestion de Tramites
          </NavLink>


        </NavItem>
      </Nav>

      <TabContent className="my-4">
        <TabPane eventKey="1" active={activeTab === "1"}>
          <ADMIN_Users />
        </TabPane>

        <TabPane eventKey="2" active={activeTab === "2"}>
          <ADMIN_Tramites/>
        </TabPane>
      </TabContent>
    </Container>
  );
}

export default ADMIN_Tabs;
