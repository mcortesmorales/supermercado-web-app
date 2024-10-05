import React from "react";
import IconsSocial from "../assets/image.png"; // Asegúrate de que la ruta sea correcta
import "../design/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="contacto">
        <img src={IconsSocial} alt="Iconos de redes sociales" /> {/* Usa <img> para mostrar la imagen */}
      </div>
      <p>&copy; Copyright © 2024 Market Corporation</p>
    </div>
  );
}

export default Footer;
