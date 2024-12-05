import React, { useState } from 'react';
import './PaymentPage.css'; // Archivo para estilos personalizados
import visaMastercard from '../assets/visa.avif';
import redCompra from '../assets/redcompra.avif';
import pagoBancario from '../assets/pagobancario.avif';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
    const { state } = useLocation(); // Obtener el estado enviado desde navigate
    const navigate = useNavigate(); // Navegar a otras rutas
    const total = state?.total || 0; // Obtener el total, usar 0 como valor predeterminado si no está definido
    const [selectedMethod, setSelectedMethod] = useState('');

    // Manejar la selección de un método de pago
    const handleMethodClick = (method) => {
        setSelectedMethod(method);
    };

    // Manejar la confirmación de pago
    const handleConfirmPayment = async () => {
        if (!selectedMethod) {
            alert('Por favor, selecciona un método de pago.');
            return;
        }

        if (selectedMethod === 'redcompra') {
            try {
                // Llamada al backend para iniciar la transacción con Transbank
                const response = await axios.post('http://localhost:5001/api/pay', {
                    amount: total,
                    sessionId: `session-${Date.now()}`, // ID único de sesión
                    buyOrder: `order-${Date.now()}`, // ID único de la orden
                    returnUrl: 'http://localhost:3000/payment/confirm' // URL de confirmación
                });

                // Redirigir al usuario a la URL proporcionada por Transbank
                window.location.href = response.data.url;
            } catch (error) {
                console.error('Error al iniciar la transacción:', error);
                alert('Hubo un problema al procesar el pago. Por favor, inténtalo nuevamente.');
            }
        } else {
            // Mostrar un mensaje para otros métodos de pago (puedes implementar flujos específicos)
            alert(`Has seleccionado: ${selectedMethod}. Total a pagar: $${total}`);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Selecciona tu método de pago</h2>
            <h4>Total a pagar: <span className="text-success">${total}</span></h4>
            <div className="payment-methods d-flex justify-content-center gap-4">
                <div
                    className={`payment-card ${selectedMethod === 'visa' ? 'selected' : ''}`}
                    onClick={() => handleMethodClick('visa')}
                >
                    <img src={visaMastercard} alt="Visa y Mastercard" />
                </div>
                <div
                    className={`payment-card ${selectedMethod === 'redcompra' ? 'selected' : ''}`}
                    onClick={() => handleMethodClick('redcompra')}
                >
                    <img src={redCompra} alt="Red Compra" />
                </div>
                <div
                    className={`payment-card ${selectedMethod === 'pago_bancario' ? 'selected' : ''}`}
                    onClick={() => handleMethodClick('pago_bancario')}
                >
                    <img src={pagoBancario} alt="Pago Bancario" />
                </div>
            </div>
            <button
                className="btn btn-success mt-4 w-100"
                onClick={handleConfirmPayment}
            >
                Confirmar Pago
            </button>
        </div>
    );
};

export default PaymentPage;