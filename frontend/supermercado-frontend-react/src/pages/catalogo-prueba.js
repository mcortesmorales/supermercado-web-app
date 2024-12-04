import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { useLocation, useNavigate } from 'react-router-dom';
import "../design/Button.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThList, faStore, faCheese, faShoppingCart, faAppleAlt, faSoap, faPaw } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/SideBar';

function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('');
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
          setCategories(uniqueCategories.filter(Boolean));
        } else {
          setCategories([]);
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Detectar la categoría desde la URL y actualizar el estado
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category") || '';
    if (category !== selectedCategory) {
      setSelectedCategory(category);
    }
  }, [location, selectedCategory]);

  // Filtrar productos según la categoría seleccionada y el texto de búsqueda
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Ordenar productos según el precio
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'asc') return a.price - b.price;
    if (sortOrder === 'desc') return b.price - a.price;
    return 0;
  });

  // Función para alternar la visibilidad del Sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
      <div className="m-4 vh-100">
    <h1 className="centered">Catálogo</h1>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
        marginBottom: "20px",
        padding: "30px 100px",
      }}
    >
      {/* Botón de categorías */}
      <button className="category-button" onClick={toggleSidebar}Toggle Sidebar>
        <FontAwesomeIcon icon={faThList} style={{ marginRight: "10px" }} />
        {isSidebarOpen ? "Cerrar Categorías" : "Abrir Categorías"}
      </button>

      {/* Barra de búsqueda con ícono */}
      <div
        style={{
          position: "relative",
          width: "600px",
        }}
      >
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <FontAwesomeIcon
          icon={faSearch}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#aaa",
          }}
        />
      </div>

      {/* Dropdown box */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="sort-dropdown"
      >
        <option value="">Ordenar por precio</option>
        <option value="asc">Menor a mayor</option>
        <option value="desc">Mayor a menor</option>
      </select>
    </div>
    <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Lista de productos */}
      <ProductList
        products={sortedProducts}
        onProductClick={(product) => navigate(`/products/${product.name}`, { state: { product } })}
      />
    </div>
  );
}

export default CatalogPage;
