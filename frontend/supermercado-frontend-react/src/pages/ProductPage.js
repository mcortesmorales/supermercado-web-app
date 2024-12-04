import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import "../design/Carrusel.css";
import "../design/Table.css";

function ProductDetailPage() {
  const { productName } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.product) {
      setProduct(location.state.product);
    } else {
      fetch(`http://localhost:5000/products/${productName}`)
        .then(response => response.json())
        .then(data => setProduct(data))
        .catch(error => console.error('Error fetching product details:', error));
    }
  }, [location.state, productName]);

  useEffect(() => {
    if (product) {
      fetch('http://localhost:5000/products')
        .then(response => response.json())
        .then(data => setRelatedProducts(data))
        .catch(error => console.error('Error fetching all products:', error));
    }
  }, [product]);

    // Desplazarse al inicio de la página cuando se carga o se navega a esta página
    useEffect(() => {
      window.scrollTo(0, 0); 
    }, [productName]); 
  

  if (!product) {
    return <div>Cargando...</div>;
  }

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

  const sliderSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const toggleTableVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <ProductDetail product={product} />

      {/* Botón para mostrar/ocultar la tabla nutricional */}
      <div className="nutritional-table">
        <button onClick={toggleTableVisibility} className="toggle-table-btn">
          {isVisible ? 'Ocultar tabla nutricional' : 'Mostrar tabla nutricional'}
        </button>
        
        {/* Tabla nutricional */}
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

      <h2>También te podría interesar...</h2>
      <Slider {...sliderSettings}>
        {relatedProducts.length > 0 ? (
          relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct._id} className="product-item">
              <img
                className="product-image"
                src={relatedProduct.imageUrl}
                alt={relatedProduct.name}
                onClick={() => navigate(`/products/${relatedProduct.name}`, { state: { product: relatedProduct } })}
              />
              <div className="product-info">
                <p className="product-name">{relatedProduct.name}</p>
                <p className="product-price">${relatedProduct.price}</p>
                <button
                  className="add-to-cart"
                  onClick={() => navigate(`/products/${relatedProduct.name}`, { state: { product: relatedProduct } })}
                >
                  Agregar al carro
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos relacionados disponibles.</p>
        )}
      </Slider>
    </div>
  );
}

export default ProductDetailPage;
