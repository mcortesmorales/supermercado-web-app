import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { useLocation, useNavigate } from 'react-router-dom';
import "../design/Button.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThList, faStore, faCheese, faShoppingCart, faAppleAlt, faSoap, faDrumstickBite, faGlassWhiskey, faPaw } from '@fortawesome/free-solid-svg-icons';
import"../design/SideBar.css"


function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener productos desde el servidor
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          setProducts(data);

          // Extraer categorías únicas de los productos
          const uniqueCategories = [...new Set(data.map(product => product.category))];
          setCategories(uniqueCategories.filter(Boolean)); // Filtra categorías válidas
        } else {
          setCategories([]); // Si no hay productos, poner categorías vacías
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Detectar la categoría desde la URL y actualizar el estado
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category") || '';
    setSelectedCategory(category);
  }, [location]);

  // Filtrar productos según la categoría seleccionada
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  // Función para alternar la visibilidad del Sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="m-4 vh-100">
      <h1 className="centered">Catálogo</h1>
  
      <button className="category-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faThList} style={{ marginRight: '20px' }} />
        {isSidebarOpen ? 'Cerrar Categorías' : 'Abrir Categorías'}
      </button>
  
      {/* Barra lateral */}
      {isSidebarOpen && (
        <div className="sidebar open">
          <div className="sidebar-header">
            <h1>Market</h1>
          </div>
          <nav>
            <a href="/" onClick={toggleSidebar} className="sidebar-link">
              <FontAwesomeIcon icon={faStore} className="sidebar-icon" />
              Supermercado
            </a>
            <a href="/?category=Despensa" onClick={toggleSidebar} className="sidebar-link">
              <FontAwesomeIcon icon={faShoppingCart} className="sidebar-icon" />
              Despensa
            </a>
            <a href="/?category=Lacteos%20y%20Derivados" onClick={toggleSidebar} className="sidebar-link">
              <FontAwesomeIcon icon={faCheese} className="sidebar-icon" />
              Lácteos
            </a>
            <a href="/?category=frutas" onClick={toggleSidebar} className="sidebar-link">
              <FontAwesomeIcon icon={faAppleAlt} className="sidebar-icon" />
              Frutas y Verduras
            </a>
            <a href="/?category=limpieza" onClick={toggleSidebar} className="sidebar-link">
              <FontAwesomeIcon icon={faSoap} className="sidebar-icon" />
              Limpieza
            </a>
            <a href="/?category=mascotas" onClick={toggleSidebar} className="sidebar-link">
              <FontAwesomeIcon icon={faPaw} className="sidebar-icon" />
              Mascotas
            </a>
            {/* Agregar más categorías según sea necesario */}
          </nav>
        </div>
      )}
      {/* Lista de productos */}
      <ProductList products={filteredProducts} onProductClick={(product) => navigate(`/products/${product.name}`, { state: { product } })} />
    </div>
  );
  
}

export default CatalogPage;
