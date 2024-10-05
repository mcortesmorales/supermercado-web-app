import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CatalogPage from './pages/catalogo-prueba';
import InventoryPage from './pages/InventoryPage';
import './App.css'; 
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from "./components/Footer"

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
        <div className="container mt-4">
          <Routes>
          <Route path="/home" element={<Home />} />
            <Route path="/" element={<CatalogPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;