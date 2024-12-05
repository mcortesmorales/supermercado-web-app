import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import CatalogPage from './pages/catalogo-prueba';
import InventoryPage from './pages/InventoryPage';
import './App.css';
import MyNavbar from './components/Navbar';
import Home from './pages/Home';
import Footer from "./components/Footer"
import AuthPage from './pages/auth-page';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import UserProfileNew from './pages/UserProfileNew';
import PaymentPage from './pages/PaymentPage';

function App() {

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/iniciar-sesion" />;
  };

  return (
    <Router>
      <div className="App">
        <MyNavbar />
        <div style={{ minHeight: '75vh' }} className="container-flex px-0 ">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<CatalogPage />} />
            <Route path="/inventory" element={<ProtectedRoute><InventoryPage /></ProtectedRoute>} />
            <Route path="/iniciar-Sesion" element={<AuthPage />} />
            <Route path="/products/:productName" element={<ProductPage />} />
            <Route path="/products/:category" element={<CatalogPage />} />
            <Route path="/perfil-nuevo" element={<ProtectedRoute><UserProfileNew /></ProtectedRoute>} />
            <Route path="/carrito" element={<CartPage />} />
            <Route path="/payment-page" element={<PaymentPage />} />
          </Routes>
        </div>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;