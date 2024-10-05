import React, { useState } from 'react';
import "../design/Dropdown.css"

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-button">
        Categoría
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <a href="#categoria1">Categoría 1</a>
          <a href="#categoria2">Categoría 2</a>
          <a href="#categoria3">Categoría 3</a>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
