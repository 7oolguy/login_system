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
            const response = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
        
            if (response.status === 200 || response.status === 201) {
                setMessage('Login bem sucedido');
        
                const data = await response.json(); // Obtém os dados da resposta
                const { token, refreshToken, email: userEmail } = data;
        
                console.log("Response Data:", data);
        
                login({ email: userEmail, token, refreshToken });
        
                navigate('/');
            } else {
                setMessage("Falha no login, Por favor, verifique suas credenciais e tente novamente.");
            }
        } catch (error) {
            setMessage("Falha no login, Por favor, verifique suas credenciais e tente novamente.");
            console.log(error);
        }
    };

    return <>
        <div className="container">
            <div className="card">
               <h1 className="section-title red-dot">Login</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-input">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-input">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <p className="switch">
                        Não tem uma conta ainda?
                        <Link to="/signup" className="link">Sign-up.</Link>
                    </p>
                    <button className="submit btn" type="submit">Login</button>
                </form>
                
                <UserInfoButton />
                
                {message && <p className="message">{message}</p>} 
            </div>
        </div>
    </>
}