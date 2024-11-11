import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faCheese, faShoppingCart, faAppleAlt, faSoap, faDrumstickBite, faGlassWhiskey, faPaw } from '@fortawesome/free-solid-svg-icons';
import '../design/SideBar.css';  // Asegúrate de tener tu archivo de estilos

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h1>Market</h1>
      </div>
      <nav className="sidebar-nav">
        <Link to="/" onClick={toggleSidebar} className="sidebar-link">
          <FontAwesomeIcon icon={faStore} className="sidebar-icon" />
          Supermercado
        </Link>
        <Link to="/lacteos-y-quesos" onClick={toggleSidebar} className="sidebar-link">
          <FontAwesomeIcon icon={faCheese} className="sidebar-icon" />
          Lácteos y Quesos
        </Link>
        <Link to="/Despensa" onClick={toggleSidebar} className="sidebar-link">
          <FontAwesomeIcon icon={faShoppingCart} className="sidebar-icon" />
          Despensa
        </Link>
        <Link to="/frutas" onClick={toggleSidebar} className="sidebar-link">
          <FontAwesomeIcon icon={faAppleAlt} className="sidebar-icon" />
          Frutas y Verduras
        </Link>
        <Link to="/limpieza" onClick={toggleSidebar} className="sidebar-link">
          <FontAwesomeIcon icon={faSoap} className="sidebar-icon" />
          Limpieza
        </Link>
        <Link to="/carne" onClick={toggleSidebar} className="sidebar-link">
          <FontAwesomeIcon icon={faDrumstickBite} className="sidebar-icon" />
          Carnicería
        </Link>
        <Link to="/botilleria" onClick={toggleSidebar} className="sidebar-link">
          <FontAwesomeIcon icon={faGlassWhiskey} className="sidebar-icon" />
          Botillería
        </Link>
        <Link to="/mascotas" onClick={toggleSidebar} className="sidebar-link">
          <FontAwesomeIcon icon={faPaw} className="sidebar-icon" />
          Mascotas
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
