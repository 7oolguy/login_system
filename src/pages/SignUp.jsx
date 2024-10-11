import React, { useState } from "react";
import axios from "axios";
import { userAuth } from "../context/AuthContext"; // Updated import
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const { login } = userAuth(); // Updated hook
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:4000/users/create", {
                email,
                password,
            });

            console.log(response.status);

            if (response.status === 201) {
                setMessage("Signup feito com sucesso!");
                // If backend returns tokens upon signup, log the user in
                if (response.data.token && response.data.refreshToken) {
                    login({
                        email,
                        token: response.data.token,
                        refreshToken: response.data.refreshToken,
                    });
                    navigate('/protected');
                } else {
                    // Otherwise, redirect to login
                    navigate('/login');
                }
            } else if (response.status === 409) {
                setMessage("Email já cadastrado.");
            }
        } catch (error) {
            setMessage("Signup falhou. Por favor, tente novamente.");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <Link to="/login">Já tem uma conta? Faça login.</Link>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SignUp;
