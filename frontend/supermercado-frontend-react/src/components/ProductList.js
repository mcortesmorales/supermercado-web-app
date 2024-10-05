import React from 'react';

function ProductList({ products, onProductClick }) {
  return (
    <div>
      <h2>Productos</h2>
      <ul className="product-list">
        {products.map(product => (
          <li key={product._id} className="product-item" onClick={() => onProductClick(product)}>
            <img className="product-image" src={product.imageUrl} alt={product.name} />
            <div className="product-info">
              <p className="product-name">{product.name}</p>
              <p className="product-price">${product.price}</p>
              <button className="add-to-cart">
                Agregar al carro
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;



