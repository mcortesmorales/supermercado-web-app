import React from 'react'
import { Link } from 'react-router-dom'
import ImagenFondo from "../assets/aaa.jpg"
import "../design/Home.css"
import Footer from "../components/Footer"
function Home() {
  return (
    <div className='home'>
        <div className='headerContainer'style={{backgroundImage: `url(${ImagenFondo})`}}>
            <hi>Market </hi>
            <p> Encuentra lo que estas buscando AQUÍ</p>
            <Link to="/">
                <button>COMPRAR AHORA</button>
            </Link> 
            </div>
    </div>
  )
}

export default Home