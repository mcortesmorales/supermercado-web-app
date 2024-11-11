import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import '../design/authpage.css';

const AuthPage = () => {
    const [activeTab, setActiveTab] = useState('login');

    return (
        <div className="container my-5 auth-container">
            <h2>Autenticación</h2>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Iniciar Sesión
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                        onClick={() => setActiveTab('register')}
                    >
                        Registrarse
                    </button>
                </li>
            </ul>

            <div className="tab-content mt-3">
                <div className={`tab-pane fade ${activeTab === 'login' ? 'show active' : ''}`}>
                    <LoginForm />
                </div>
                <div className={`tab-pane fade ${activeTab === 'register' ? 'show active' : ''}`}>
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
