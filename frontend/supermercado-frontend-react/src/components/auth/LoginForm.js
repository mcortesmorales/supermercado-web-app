import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onSwitchToRegister, onSwitchToReset }) => {
    console.log("LoginForm is rendering");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });
            console.log('Login successful:', response.data);
            
            // Guardar el token en localStorage
            localStorage.setItem('token', response.data.token);
            
            // Redirigir o actualizar el estado de la aplicación según sea necesario
            window.location.href = '/protected'; // Cambia esto a la ruta que deseas después del login
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

