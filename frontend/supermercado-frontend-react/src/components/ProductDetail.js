import React from 'react';

function ProductDetail({ product }) {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-5 text-center">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="img-fluid" 
            style={{ width: '500px', height: 'auto' }} 
          />
        </div>

        <div className="col-md-7">
          <h2 className="mb-3">{product.name}</h2>
          <h3 className="text-dark mb-3">${product.price}</h3>
          <button className="btn btn-success btn-lg mb-3">Agregar</button>
          <p className="text-muted" style={{ fontSize: '1rem', marginTop: '1rem' }}>
            {product.description}
          </p>
          <p className="product-ingredients">Ingredientes
            <p className="text-muted" style={{ fontSize: '1rem'}}>
            {product.ingredients}
            </p>
            </p>
        </div>
      </div>
      
    </div>
  );
  
}

export default ProductDetail;
