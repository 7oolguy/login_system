import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserInfoButton from "../components/UserInfoButton";

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const response = await axios.post("http://localhost:4000/users/create", {
                email,
                password,
            })

            if (response.status === 200 || response.status === 201) {
                setMessage("Cadastro realizado com sucesso!")

                navigate('/login')
            }
            console.log('Response:',response)
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setMessage("Email ja cadastrado.")
            } else {
                setMessage("Cadastro falhou. Por favor, tente novamente.")
            }
            console.log(error)
        }
    }
    return (
        <div className="page">
            <div className="card">
                <h2 className="title">Cadastro</h2>
                <form className="singup-form l" onSubmit={handleSubmit}>
                    <div className="email-div">
                        <label>Email:</label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="password-div">
                        <label>Senha:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Link className="link" to="/login">Já tem uma conta? Faça login aqui.</Link>
                    <button type="submit">Cadastrar</button>
                </form>
                {message && <p>{message}</p>}
            </div>
            
            <UserInfoButton />
            
        </div>
    )
}