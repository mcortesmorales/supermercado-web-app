import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CatalogPage from './pages/catalogo-prueba';
import InventoryPage from './pages/InventoryPage';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
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
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;