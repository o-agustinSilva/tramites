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
  MDBBtn,
} from "mdb-react-ui-kit";

function Header() {
  const user = localStorage.getItem("user");
  const name = JSON.parse(localStorage.getItem("user"));
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
          style={{color:"#d8dfeb"}}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav id="headerLinks" className="d-flex justify-content-start">
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current="page" href="/">
                Inicio
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active href="/requestTramite">Iniciar un trámite</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button" style={{ color: "black" }}>
                  Ayuda
                </MDBDropdownToggle>
                <MDBDropdownMenu id="headerSublinks">
                  <MDBDropdownItem link>Tengo un problema</MDBDropdownItem>
                  <MDBDropdownItem link>Contacto</MDBDropdownItem>
                  <MDBDropdownItem link>FAQ</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>


          <form className="d-flex input-group w-auto">
            {user ? (
              <HEADER_Dropdown />
               
            ) : (
              <Link to="/login">
                <MDBBtn className='me-1 d-flex align-items-center' color='secondary'>
                  <MDBIcon far icon="user-circle" size='2x' style={{ marginRight: '10px', color:"#285192" }} />
                  <span>INGRESAR</span>
                </MDBBtn>
              </Link>
            )}
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Header;
