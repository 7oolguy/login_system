import React from 'react';
import { userAuth } from './AuthContext'; // Updated import
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const { isAuthenticated } = userAuth(); // Updated hook

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
