// src/context/UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    // Función para actualizar el userId
    const setUser = (id) => {
        setUserId(id);
    };

    return (
        <UserContext.Provider value={{ userId, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personalizado para acceder al UserContext
export const useUser = () => {
    return useContext(UserContext);
};
