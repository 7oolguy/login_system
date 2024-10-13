import React from 'react';
import { userAuth } from './AuthContext';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const { isAuthenticated } = userAuth(); // hook Atualizado

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
