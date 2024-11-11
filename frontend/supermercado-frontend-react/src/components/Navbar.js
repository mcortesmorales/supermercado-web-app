import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import "../Navbar.css";
import Logo from "../assets/logosuper.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { Navbar, Nav, Container } from 'react-bootstrap';

const MyNavbar = () => {
    const navigate = useNavigate();  // Para redirigir programáticamente
    const isLoggedIn = localStorage.getItem('token'); // Verifica si hay un token en el localStorage

    const handleUserClick = () => {
        if (isLoggedIn) {
            navigate('/perfil-nuevo'); // Si está logueado, redirige al perfil
        } else {
            navigate('/iniciar-sesion'); // Si no está logueado, redirige al login
        }
    };

    const handleLogout = () => {
        // Eliminar el token del localStorage
        localStorage.removeItem('token');
        // Redirigir a la página de inicio de sesión
        navigate('/iniciar-sesion');
    };

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
                        <Nav.Link as="button" className="ms-2" onClick={handleUserClick}>
                            <FontAwesomeIcon icon={faUser} style={{ fontSize: '25px' }} />
                        </Nav.Link>
                        <Nav.Link as={Link} to="/carrito" className="ms-3">
                            <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '25px' }} />
                        </Nav.Link>
                        {isLoggedIn && (
                            <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                Cerrar Sesión
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default MyNavbar