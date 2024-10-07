import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CatalogPage from './pages/catalogo-prueba';
import InventoryPage from './pages/InventoryPage';
import './App.css'; 
import MyNavbar from './components/Navbar';
import Home from './pages/Home';
import Footer from "./components/Footer"
import AuthPage from './pages/auth-page';

function App() {
  return (
    <Router>
      <div className="App">
      <MyNavbar />
        <div className="container-flex px-0">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<CatalogPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/iniciar-Sesion" element = {<AuthPage/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;