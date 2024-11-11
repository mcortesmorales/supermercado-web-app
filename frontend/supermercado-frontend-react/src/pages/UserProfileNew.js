import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfileNew = () => {
    const [userData, setUserData] = useState({ username: '', name: '', email: '', address: '', phone: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false); 
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
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
        fetchData();
    }, []);

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const saveDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:4000/api/profile', userData, {
                headers: { 'x-access-token': token }
            });
            setMessage('Detalles guardados exitosamente');
            setIsEditing(false);
        } catch (error) {
            console.error('Error al guardar los detalles:', error);
            setMessage('Error al guardar los detalles');
        }
    };

    const handlePasswordChange = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('http://localhost:4000/api/change-password', {
                currentPassword,
                newPassword
            }, {
                headers: { 'x-access-token': token }
            });
    
            if (response.status === 200) {
                setMessage('Contraseña actualizada exitosamente');
                setIsChangingPassword(false);
                setCurrentPassword('');
                setNewPassword('');
            } else {
                setMessage('Error al cambiar la contraseña');
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            setMessage('Error al cambiar la contraseña');
        }
    };
    
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2>Perfil de Usuario</h2>

            <div>
                <label>Nombre de Usuario:</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                    />
                ) : (
                    <p>{userData.username || 'No especificado'}</p>
                )}
            </div>

            <div>
                <label>Nombre Completo:</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                    />
                ) : (
                    <p>{userData.name || 'No especificado'}</p>
                )}
            </div>

            <div>
                <label>Email:</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                ) : (
                    <p>{userData.email || 'No especificado'}</p>
                )}
            </div>

            <div>
                <label>Dirección:</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={handleChange}
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
                    />
                ) : (
                    <p>{userData.phone || 'No especificado'}</p>
                )}
            </div>

            {isEditing ? (
                <button onClick={saveDetails}>Guardar cambios</button>
            ) : (
                <button onClick={toggleEditMode}>Editar perfil</button>
            )}

            <button onClick={() => setIsChangingPassword(!isChangingPassword)}>
                Cambiar Contraseña
            </button>

            {isChangingPassword && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Cambiar Contraseña</h3>
                    <input
                        type="password"
                        placeholder="Contraseña actual"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button onClick={handlePasswordChange}>Guardar nueva contraseña</button>
                </div>
            )}

            {message && <p>{message}</p>}
        </div>
    );
};

export default UserProfileNew;
