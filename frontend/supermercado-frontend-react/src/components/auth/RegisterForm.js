import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ onSwitchToLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/register', { username, email, password });
            setSuccess(response.data.message);
            setError('');
            // Limpiar el formulario después del registro
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (err) {
            console.error('Error during registration:', err);
            setError(err.response ? err.response.data.message : 'Registration failed');
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

