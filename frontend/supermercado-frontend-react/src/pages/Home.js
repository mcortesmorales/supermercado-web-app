import React from 'react'
import { Link } from 'react-router-dom'
import ImagenFondo from "../assets/aaa.jpg"
import "../design/Home.css"
import Footer from "../components/Footer"
function Home() {
  return (
  <div className="home w-100 h-100 d-flex align-items-center justify-content-center">
    <div className="headerContainer container text-center">
      <h2 className="display-4 mb-4">Market</h2>
      <p className="lead mb-4">Encuentra lo que estás buscando AQUÍ</p>
      <Link to="/">
        <button>COMPRAR AHORA</button>
      </Link>
    </div>
  </div>
  )
}

export default Home