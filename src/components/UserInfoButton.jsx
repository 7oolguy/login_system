// UserInfoButton.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

const UserInfoButton = () => {
    const { user } = useAuth(); // Usa a hook customizada para pegar a informacao do usuario

    const handleClick = () => {
        if (user) {
            console.log("User esta logado:", user); // Log a informacao do usuario
        } else {
            console.log("User nao esta logado.");
        }
    };

    return (
        <button className="user-info btn" onClick={handleClick}>
            Checar Informação do usuário no console
        </button>
    );
};

export default UserInfoButton;
