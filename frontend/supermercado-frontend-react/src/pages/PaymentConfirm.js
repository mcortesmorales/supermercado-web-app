import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaymentConfirm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token_ws');

    const confirmPayment = async () => {
      try {
        const response = await axios.post('http://localhost:5001/api/pay/confirm', { token });
        console.log('Pago confirmado:', response.data);

        // Redirige al usuario a una página de éxito
        navigate('/payment/success');
      } catch (error) {
        console.error('Error al confirmar el pago:', error);
        navigate('/payment/error');
      }
    };

    if (token) confirmPayment();
  }, [navigate]);

  return <div>Confirmando pago...</div>;
};

export default PaymentConfirm;