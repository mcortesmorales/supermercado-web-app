import React from 'react';

function ProductDetail({ product }) {
  return (
    <div>
      <h2>Product Details</h2>
      <p><strong>Name:</strong> {product.name}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
    </div>
  );
}

export default ProductDetail;
