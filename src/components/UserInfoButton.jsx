// UserInfoButton.jsx
import React from "react";
import { useAuth } from "../context/AuthContext"; // Adjust the path as necessary

const UserInfoButton = () => {
    const { user } = useAuth(); // Use your custom hook to get user info

    const handleClick = () => {
        if (user) {
            console.log("User is logged in:", user); // Log user information
        } else {
            console.log("User is not logged in.");
        }
    };

    return (
        <button className="userButton" onClick={handleClick}>
            Checa Informação do Usuario pressione F12
        </button>
    );
};

export default UserInfoButton;
