import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../pages/UserContext';
import { useNavigate } from 'react-router-dom'; 

const RegisterForm = ({ onSwitchToLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { setUser } = useUser(); // Obtener el setter del contexto
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Registrar al usuario
            const response = await axios.post('http://localhost:4000/api/register', { username, email, password });
            setSuccess(response.data.message);
            setError('');

            // Obtener el userId desde la respuesta
            const userId = response.data.userId;

            // Crear el carrito automáticamente
            await axios.post(`http://localhost:5001/${userId}/create`);

            // Login automático
            const loginResponse = await axios.post('http://localhost:4000/api/login', { email, password });

            // Guardar el token en localStorage
            localStorage.setItem('token', loginResponse.data.token);

            // Establecer el userId en el contexto
            setUser(loginResponse.data.userId);

            // Resetear los campos del formulario
            setSuccess('Registro exitoso e inicio de sesión automático');
            setUsername('');
            setEmail('');
            setPassword('');

            navigate("/home");

        } catch (err) {
            console.error('Error during registration:', err);
            setError(err.response ? err.response.data.message : 'Error en el registro');
            setSuccess('');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Registro</h2>
            <form onSubmit={handleRegister} className="bg-light p-4 rounded shadow-sm">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Ingresa tu nombre de usuario"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingresa tu email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                        required
                    />
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {success && <div className="alert alert-success" role="alert">{success}</div>}
                <button type="submit" className="btn btn-primary w-100">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterForm;
