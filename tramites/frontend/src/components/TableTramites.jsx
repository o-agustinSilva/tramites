import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "react-bootstrap";
import { MDBIcon } from "mdb-react-ui-kit";
import TRAMITES_ListTramites from "./TRAMITES_ListTramites";

export function TableTramites() {
  const [activeTab, setActiveTab] = useState("1");

  const cambiarTab = (numeroTab) => {
    if (activeTab !== numeroTab) {
      setActiveTab(numeroTab);
    }
  };

  return (
    <Container className="my-4">
      <Nav tabs="true" defaultActiveKey="1">
        <NavItem className="d-flex flex-row text-aling-center">
          <NavLink
            className={activeTab == "1" ? "activeTab baseTab" : "baseTab"}
            onClick={() => cambiarTab("1")}
            style={{borderRadius:"10px"}}>
            <MDBIcon fas tabIndex="-1" icon="user-friends" size="1x" className="mx-2" />
            Trámites pendientes
          </NavLink>
          <NavLink
            className={`${activeTab === "2" ? "activeTab baseTab" : "baseTab"} mx-3`}
            onClick={() => cambiarTab("2")}
            style={{borderRadius:"10px"}}>
            <MDBIcon fas icon="copy" size="1x" className="mx-2" />
            Trámites finalizados
          </NavLink>

        </NavItem>
      </Nav>

      <TabContent className="my-4">
        <TabPane eventKey="1" active={activeTab === "1"}>
          <TRAMITES_ListTramites status="pendiente"/>
        </TabPane>

        <TabPane eventKey="2" active={activeTab === "2"}>
        <TRAMITES_ListTramites status="finalizado" />
        </TabPane>
      </TabContent>
    </Container>
  );
}

export default TableTramites;
