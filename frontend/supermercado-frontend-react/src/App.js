import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Obtener los productos desde el microservicio
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="App">
      <h1>Supermarket Catalog</h1>
      <ProductList products={products} onProductClick={handleProductClick} />
      {selectedProduct && <ProductDetail product={selectedProduct} />}
    </div>
  );
}

export default App;
