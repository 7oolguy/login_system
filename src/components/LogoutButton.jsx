import React from "react";
import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
    const { logout } = useAuth(); // Assume you have a logout function in your AuthContext

    const handleLogout = () => {
        logout(); // Call your logout function
        window.location.href = '/login'; // Redirect to login after logout
    };

    return <button className="logout btn" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
