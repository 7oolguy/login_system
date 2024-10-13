import React from "react";
import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
    const { logout } = useAuth(); // Assume you have a logout function in your AuthContext

    const handleLogout = () => {
        logout();
        window.location.href = '/login'; // Redireciona para login ao fazer o logout
    };

    return <button className="logout btn" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
