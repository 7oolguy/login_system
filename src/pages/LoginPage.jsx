import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import UserInfoButton from "../components/UserInfoButton";

export default function LoginPage() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ message, setMessage ] = useState('')

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:4000/auth/login', {
                email,
                password
            });

            if (response.status === 200 || response.status === 201) {
                setMessage('Login bem sucedido');

                const { token, refreshToken, email: userEmail } = response.data;

                console.log("Response Data:", response.data)

                login({ email: userEmail, token, refreshToken });

                navigate('/');
            }
            console.log('Response:',response)
        } catch (error) {
            setMessage("Falha no login, Por favor, verifique suas credenciais e tente novamente.")
            console.log(error)
        }
    };

    return <>
        <div className="login-page page">
            <div className="card">
               <h1 className="title">Login</h1>
                <form className="login-form l" onSubmit={handleSubmit}>
                    <div className="email-div">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="password-div">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Link to="/signup" className="crie-conta-link link">Não tem conta? Crie uma agora.</Link>
                    <button className="submit-btn" type="submit">Login</button>
                </form>
                
                <UserInfoButton />
                
                {message && <p className="message">{message}</p>} 
            </div>
        </div>
    </>
}