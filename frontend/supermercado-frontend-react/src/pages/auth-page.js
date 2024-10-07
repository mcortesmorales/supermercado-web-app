import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import ChangePasswordForm from '../components/auth/ChangePasswordForm';
import '../design/authpage.css'

const AuthPage = () => {
    const [activeTab, setActiveTab] = useState('login');

    return (
      <div className="container my-5 auth-container">
        <h2>Autenticación</h2>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
              href="#"
            >
              Iniciar Sesión
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
              href="#"
            >
              Registrarse
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'changePassword' ? 'active' : ''}`}
              onClick={() => setActiveTab('changePassword')}
              href="#"
            >
              Cambiar Contraseña
            </a>
          </li>
        </ul>
  
        <div className="tab-content mt-3">
          <div className={`tab-pane fade ${activeTab === 'login' ? 'show active' : ''}`}>
            <LoginForm />
          </div>
          <div className={`tab-pane fade ${activeTab === 'register' ? 'show active' : ''}`}>
            <RegisterForm />
          </div>
          <div className={`tab-pane fade ${activeTab === 'changePassword' ? 'show active' : ''}`}>
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    );
  };

export default AuthPage;