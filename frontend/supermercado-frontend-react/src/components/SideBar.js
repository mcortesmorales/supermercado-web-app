import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../design/SideBar.css";
import {
  faStore,
  faShoppingCart,
  faCheese,
  faAppleAlt,
  faSoap,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    isSidebarOpen && (
      <div className="sidebar open">
        <div className="sidebar-header">
          <h1>Market</h1>
        </div>
        <nav>
          <a href="/" onClick={toggleSidebar} className="sidebar-link">
            <FontAwesomeIcon icon={faStore} className="sidebar-icon" />
            Supermercado
          </a>
          <a
            href="/?category=Despensa"
            onClick={toggleSidebar}
            className="sidebar-link"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="sidebar-icon" />
            Despensa
          </a>
          <a
            href="/?category=Lacteos%20y%20Derivados"
            onClick={toggleSidebar}
            className="sidebar-link"
          >
            <FontAwesomeIcon icon={faCheese} className="sidebar-icon" />
            Lácteos
          </a>
          <a
            href="/?category=Frutas%20y%20Verduras"
            onClick={toggleSidebar}
            className="sidebar-link"
          >
            <FontAwesomeIcon icon={faAppleAlt} className="sidebar-icon" />
            Frutas y Verduras
          </a>
          <a
            href="/?category=Limpieza"
            onClick={toggleSidebar}
            className="sidebar-link"
          >
            <FontAwesomeIcon icon={faSoap} className="sidebar-icon" />
            Limpieza
          </a>
          <a
            href="/?category=Mascotas"
            onClick={toggleSidebar}
            className="sidebar-link"
          >
            <FontAwesomeIcon icon={faPaw} className="sidebar-icon" />
            Mascotas
          </a>
        </nav>
      </div>
    )
  );
};

export default Sidebar;
