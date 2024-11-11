import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProtectedPage = () => {
    const [userData, setUserData] = useState({ address: '', phone: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');

    // Cargar los detalles del usuario cuando la página cargue
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/api/profile', {
                    headers: { 'x-access-token': token }
                });
                setUserData(response.data.user);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const saveDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:4000/api/user-details', userData, {
                headers: { 'x-access-token': token }
            });
            setMessage('Detalles guardados exitosamente');
            setIsEditing(false);
        } catch (error) {
            console.error('Error al guardar los detalles:', error);
            setMessage('Error al guardar los detalles');
        }
    };

    return (
        <div className="container my-5">
            <h2>Perfil de Usuario</h2>
            <p>Bienvenido a tu perfil. Aquí puedes ver y editar tus detalles de compra.</p>

            <div>
                <label>Dirección:</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={handleChange}
                        placeholder="Ingresa tu dirección"
                    />
                ) : (
                    <p>{userData.address || 'No especificado'}</p>
                )}
            </div>
            <div>
                <label>Teléfono:</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        placeholder="Ingresa tu teléfono"
                    />
                ) : (
                    <p>{userData.phone || 'No especificado'}</p>
                )}
            </div>

            {isEditing ? (
                <button onClick={saveDetails}>Guardar cambios</button>
            ) : (
                <button onClick={() => setIsEditing(true)}>Editar perfil</button>
            )}

            {message && <p>{message}</p>}
        </div>
    );
};

export default ProtectedPage;
