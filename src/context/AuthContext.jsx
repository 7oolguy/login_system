import React, { createContext, useState, useEffect, useContext } from "react";

// Auth Context
const AuthContext = createContext();

// Hook customizado para usar o AuthContext
export const useAuth = () => useContext(AuthContext);

// Componente que disponibiliza objeto auth para qualquer children que chamar useAuth()
export const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState(null); // Armazena dados do usuario
    const [ isAuthenticated, setIsAuthenticated ] = useState(false); // Status da Autenticação
    const [ loading, setLoading ] = useState(true); // Loading para lidar com a checaagem inicial

    // Efeito para carregar os dados do usuario para o localStorage na inicialização do app
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            setUser(storedUser)
            setIsAuthenticated(true)
        }

        setLoading(false); // Auth state terminou
    }, []);

    //Login
    const login = (userData) => {
        setUser(userData)
        setIsAuthenticated(true)
        // Armazena os dados e tokens no localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token)
        localStorage.setItem('refreshToken', userData.refreshToken)
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        // Remove os dados do usuarios do localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    }

    // Valor a ser passado a qualquer descendente desse componente
    const contextValue = {
        user,
        isAuthenticated,
        login,
        logout,
        loading
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
}