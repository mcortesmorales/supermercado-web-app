import React from 'react'
import { Link } from 'react-router-dom';
import "../Navbar.css"
import Logo from "../assets/logosuper.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container} from 'react-bootstrap';


const MyNavbar = () => {
  return (
      <Navbar className='myNavBar' expand="md" collapseOnSelect>
          <div className='container-fluid px-5'>
              <Navbar.Brand className='d-flex align-items-center' as={Link} to="/home">
                  <img src={Logo} alt="Logo" style={{ height: '100px', marginRight: '10px' }} />
                  <h1 className='pt-2'>Market</h1>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ms-auto">
                      <Nav.Link as={Link} to="/home">Inicio</Nav.Link>
                      <Nav.Link as={Link} to="/">Catálogo</Nav.Link>
                      <Nav.Link as={Link} to="/inventory">Gestión de Inventario</Nav.Link>
                      <Nav.Link className=' ms-2' as={Link} to="/iniciar-sesion">
                          <FontAwesomeIcon icon={faUser} style={{ fontSize: '25px' }} />
                      </Nav.Link>
                  </Nav>
              </Navbar.Collapse>
          </div>
      </Navbar>
  );
};

export default MyNavbar