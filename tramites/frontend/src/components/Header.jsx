import React, { Component, useState } from "react";
import Button from "react-bootstrap/Button";
import HEADER_Dropdown from "./HEADER_Dropdown";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";

function Header() {
  const user = localStorage.getItem("user");
  const [openBasic, setOpenBasic] = useState(false);

  return (
    <MDBNavbar expand="lg" light bgColor="light" id="header">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">
          <img
            src="https://policia.tierradelfuego.gob.ar/wp-content/uploads/2021/12/LOGO-POLICIA_GOBIERNO.png"
            width="170px"
            height="70px"
          ></img>
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className="justify-content-center mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current="page" href="/">
                Inicio
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/dashboard">Iniciar un trámite</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Ayuda
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>Tengo un problema</MDBDropdownItem>
                  <MDBDropdownItem link>Contacto</MDBDropdownItem>
                  <MDBDropdownItem link>FAQ</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <form className="d-flex input-group w-auto">
            {user ? (
              <HEADER_Dropdown/>
            ) : (
              <Link to="/login">
                <Button className="buttonPrimary" variant="outline-success">
                  Iniciar sesión
                </Button>
              </Link>
            )}
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Header;
