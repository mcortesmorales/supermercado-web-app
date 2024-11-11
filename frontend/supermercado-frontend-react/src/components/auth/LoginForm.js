import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onSwitchToRegister, onSwitchToReset, setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/login', { email, password });
            console.log('Login successful:', response.data);
            
            // Guardar el token en localStorage
            localStorage.setItem('token', response.data.token);
            alert('Inicio de sesión exitoso');
            setError('');
            // Establecer el userId en el contexto
            setUser(response.data.userId);
        } catch (err) {
            console.error('Error during login:', err);
            setError(err.response ? err.response.data.message : 'Login failed');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className="bg-light p-4 rounded shadow-sm">
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
                <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default LoginForm;
