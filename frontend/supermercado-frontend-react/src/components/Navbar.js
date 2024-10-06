import React from 'react'
import { Link } from 'react-router-dom';
import "../Navbar.css"
import Logo from "../assets/logosuper.png"
import "./Dropdown"
import Dropdown from './Dropdown';

import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container} from 'react-bootstrap';


function MyNavbar() {
  return (
    // <div className='navbar'>
    //     <div className='leftSide'>
    //         <img src={Logo}/>
    //         <h1>Market</h1>
    //     </div>
    //     <div className='rigthSide'></div>
    //     <Link className="navbar-brand" to="/home">Inicio</Link>
    //     <Link className="nav-link" to="/">Catálogo</Link>
    //     <Link className="nav-link" to="/inventory">Gestión de Inventario</Link>
    // </div>
    <Navbar className='myNavBar' expand="md" collapseOnSelect>
      <div className='container-fluid px-5'>
        <Navbar.Brand className=' d-flex align-items-center ' as={Link} to="/home">
          <img src={Logo} alt="Logo" style={{ height: '100px', marginRight: '10px' }} />
          <h1 className=' pt-2'>Market</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/home">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/">Catálogo</Nav.Link>
            <Nav.Link as={Link} to="/inventory">Gestión de Inventario</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>


        /*<><div className="navbar"></div><div className="container-fluid">
          <Link className="navbar-brand" to="/">Supermarket</Link>
          <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                      <Link className="nav-link" to="/">Catalogo</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to="/inventory">Gestión de Inventario</Link>
                  </li>
              </ul>
          </div>
      </div></>
      </nav></>*/
  )
}

export default MyNavbar