import React, { useState } from 'react';

function ProductDetail({ product }) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleTableVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const parseNutritionalData = (data) => {
    const rows = data.split('\n');
    const parsedData = {};

    rows.forEach((row) => {
      const parts = row.split(':');
      const nutrient = parts[0].trim();
      const value = parts[1].trim();

      const [name, unit, per] = nutrient.split(' (');
      const key = name.trim();

      if (!parsedData[key]) {
        parsedData[key] = {};
      }

      if (per.includes('100g/ml')) {
        parsedData[key].per100g = value;
      } else if (per.includes('porción')) {
        parsedData[key].perServing = value;
      }
    });

    return parsedData;
  };

  const nutritionalInfo = product.table ? parseNutritionalData(product.table) : {};

  // Verificar si el producto es de las categorías "limpieza" o "mascotas"
  const isCleaningProduct = product.category === 'Limpieza';
  const isPetProduct = product.category === 'Mascotas';

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

          {/* Mostrar ingredientes solo si no es de la categoría "limpieza" */}
          {!isCleaningProduct && (
            <p className="product-ingredients">
              Ingredientes
              <p className="text-muted" style={{ fontSize: '1rem'}}>
                {product.ingredients}
              </p>
            </p>
          )}

          {/* Mostrar tabla nutricional solo si no es de las categorías "limpieza" o "mascotas" */}
          {!isCleaningProduct && !isPetProduct && (
            <div className="nutritional-table">
              <button onClick={toggleTableVisibility} className="toggle-table-btn">
                {isVisible ? 'Ocultar tabla nutricional' : 'Mostrar tabla nutricional'}
              </button>
              {isVisible && (
                <table>
                  <thead>
                    <tr>
                      <th>Nutriente</th>
                      <th>Por cada 100g/ml</th>
                      <th>Por cada porción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(nutritionalInfo).map((key, index) => (
                      <tr key={index}>
                        <td>{key}</td>
                        <td>{nutritionalInfo[key].per100g || '-'}</td>
                        <td>{nutritionalInfo[key].perServing || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
