import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import ProductDetail from '../components/ProductDetail';

function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    <div>
      <h1>Catalog</h1>
      <ProductList products={products} onProductClick={handleProductClick} />
      {selectedProduct && <ProductDetail product={selectedProduct} />}
    </div>
  );
}

export default CatalogPage;