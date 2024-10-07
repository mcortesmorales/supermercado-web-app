import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordForm = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/change-password', { email, oldPassword, newPassword });
            setSuccess(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Error al cambiar la contraseña');
            setSuccess('');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Cambiar Contraseña</h2>
            <form onSubmit={handleChangePassword} className="bg-light p-4 rounded shadow-sm">
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
                    <label htmlFor="oldPassword" className="form-label">Contraseña Antigua</label>
                    <input 
                        type="password" 
                        id="oldPassword"
                        className="form-control" 
                        value={oldPassword} 
                        onChange={(e) => setOldPassword(e.target.value)} 
                        placeholder="Ingresa tu contraseña antigua" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">Nueva Contraseña</label>
                    <input 
                        type="password" 
                        id="newPassword"
                        className="form-control" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        placeholder="Ingresa tu nueva contraseña" 
                        required 
                    />
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {success && <div className="alert alert-success" role="alert">{success}</div>}
                <button type="submit" className="btn btn-primary w-100">Cambiar Contraseña</button>
            </form>
        </div>
    );
};

export default ChangePasswordForm;
