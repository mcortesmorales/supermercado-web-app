import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import { useUser } from './UserContext';

const CartPage = () => {
    //const { userId } = useUser()
    const userId = '12345'; // Reemplaza esto con el ID real cuando implementes el contexto
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        console.log(userId)
        if (userId) {
            axios.get(`http://localhost:5001/${userId}`)
                .then(response => {
                    console.log('Respuesta de la API:', response.data);
                    // Directamente establecer los items sin necesidad de agrupar
                    setCartItems(response.data.items);  
                })
                .catch(error => {
                    console.error('Error fetching cart:', error);
                });
        }
    }, [userId]);

    const handleQuantityChange = (id, quantity) => {
        const updatedQuantity = parseInt(quantity, 10);  // Aseguramos que la cantidad es un número
        if (updatedQuantity > 0) {
            axios.post(`http://localhost:5001/${userId}/update_quantity`, {
                product_id: id,
                quantity: updatedQuantity
            })
            .then(response => {
                console.log(response.data);
                // Actualiza el carrito localmente
                setCartItems(prevItems =>
                    prevItems.map(item =>
                        item._id === id ? { ...item, quantity: updatedQuantity } : item
                    )
                );
            })
            .catch(error => {
                console.error('Error updating quantity:', error);
            });
        } else {
            alert("Quantity must be greater than 0");
        }
    };
    
    

    // Eliminar un artículo del carrito
    const handleRemoveItem = (itemId) => {
        axios.delete(`http://localhost:5001/${userId}/remove/${itemId}`)
            .then(response => {
                console.log(response.data);
                // Eliminar el artículo localmente después de la eliminación
                setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
            })
            .catch(error => {
                console.error('Error removing item:', error);
            });
    };

    // Calcular el total del carrito
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
    };

    return (
        <Container>
            <h2 className="my-4">Carrito de Compras</h2>

            {cartItems.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                                    />
                                </td>
                                <td>${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleRemoveItem(item._id)}
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>El carrito está vacío.</p>
            )}

            <Row className="mt-4">
                <Col md={{ span: 4, offset: 8 }}>
                    <h4>Total: ${calculateTotal()}</h4>
                    <Button variant="success" className="w-100 mt-2">
                        Proceder al Pago
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;
