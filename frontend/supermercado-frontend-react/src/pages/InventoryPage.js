import React, { useState, useEffect } from 'react';

function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', stock: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  // Obtener productos
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Manejar cambios de input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Agregar producto
  const handleAddProduct = () => {
    fetch("http://localhost:5000/product", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(data => {
                        setProducts([...products, data]);
                        setNewProduct({ name: '', price: '', description: '', stock: '' });
                    }
            )
      .catch(error => console.error('Error adding product:', error));
  };

  // Eliminar producto
  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:5000/product/${id}`, {
      method: 'DELETE',
    })
      .then(() => setProducts(products.filter(product => product._id !== id)))
      .catch(error => console.error('Error deleting product:', error));
  };

  // Editar producto
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleCancelEditProduct = () => {
    setEditingProduct(null); // Salir del modo de edición
    setNewProduct({ name: '', price: '', description: '', stock: '' }); // Limpiar los campos
  };

  // Guardar cambios en el producto editado
  const handleSaveEdit = () => {
    fetch(`http://localhost:5000/product/${editingProduct._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(updatedProduct => {
        setProducts(products.map(product => product._id === updatedProduct._id ? updatedProduct : product));
        setEditingProduct(null);
        setNewProduct({ name: '', price: '', description: '', stock: '' });
      })
      .catch(error => console.error('Error updating product:', error));
  };

  return (
    <div className=' m-4 vh-100'>
      <h1>Gestión de Inventario</h1>
      <div className="row mb-4">
        <div className="col-md-6">
          <input className="form-control mb-2" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Nombre" />
          <input className="form-control mb-2" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Precio" />
          <input className="form-control mb-2" name="description" value={newProduct.description} onChange={handleInputChange} placeholder="Descripcion" />
          <input className="form-control mb-2" name="stock" value={newProduct.stock} onChange={handleInputChange} placeholder="Stock" />
          {editingProduct ? (
            <>
                <button className="btn btn-primary me-2" onClick={handleSaveEdit}>Guardar Cambios</button>
                <button className="btn btn-secondary" onClick={handleCancelEditProduct}>Cancelar</button>
            </>
            ) : (
            <button className="btn btn-success" onClick={handleAddProduct}>Añadir Producto</button>
            )}
        </div>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditProduct(product)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(product._id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryPage;
