import React from 'react';
import { useUser } from '../pages/UserContext';

function ProductList({ products, onProductClick }) {

  const { userId } = useUser()
  
  // Esta función maneja la adición al carrito
  const handleAddToCart = (product) => {
    

    // Enviar la solicitud para agregar el producto al carrito
    fetch(`http://localhost:5001/${userId}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item: { ...product, quantity: 1 },  // Asumimos que la cantidad inicial es 1
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Item added' || data.message === 'Item updated') {
          // Si el artículo fue agregado o actualizado
          alert('Producto agregado al carrito');
        } else {
          alert('Error al agregar el producto al carrito');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Productos</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id} className="product-item" onClick={() => onProductClick(product)}>
            <img className="product-image" src={product.imageUrl} alt={product.name} />
            <div className="product-info">
              <p className="product-name">{product.name}</p>
              <p className="product-price">${product.price}</p>
              <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                Agregar al carrito
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
