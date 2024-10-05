import React from 'react'
import { Link } from 'react-router-dom';
import "../Navbar.css"
import Logo from "../assets/logosuper.png"
import "./Dropdown"
import Dropdown from './Dropdown';

function Navbar() {
  return (
    <div className='navbar'>
        <div className='leftSide'>
            <img src={Logo}/>
            <h1>Market</h1>
        </div>
        <div className='rigthSide'></div>
        <Link className="navbar-brand" to="/home">Inicio</Link>
        <Link className="nav-link" to="/">Catálogo</Link>
        <Link className="nav-link" to="/inventory">Gestión de Inventario</Link>
    </div>
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

export default Navbar