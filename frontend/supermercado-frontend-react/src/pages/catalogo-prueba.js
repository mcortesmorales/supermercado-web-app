import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import ProductDetail from '../components/ProductDetail';

function CatalogPage() {
  const [products, setProducts] = useState([]); // Estado para los productos
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado
  const [selectedCategory, setSelectedCategory] = useState(''); // Estado para la categoría seleccionada
  const [categories, setCategories] = useState([]); // Estado para las categorías

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

  // Manejar clic en producto
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Manejar cambio de categoría
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filtrar productos según la categoría seleccionada
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className='m-4'>
      <h1 className="centered">Catálogo</h1>

      {/* Selector de categoría */}
      <div className="category-filter centered">
        <label htmlFor="category-select">Seleccionar categoría: </label>
        <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de productos filtrados */}
      <ProductList products={filteredProducts} onProductClick={handleProductClick} />
      
      {/* Detalles del producto seleccionado */}
      {selectedProduct && <ProductDetail product={selectedProduct} />}
    </div>
  );
}

export default CatalogPage;
