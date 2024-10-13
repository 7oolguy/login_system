// Importa React e useState para gerenciar o estado local, e useNavigate e Link para navegação entre páginas.
// Também importa o componente UserInfoButton.
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserInfoButton from "../components/UserInfoButton";

// Componente funcional que representa a página de cadastro.
export default function SignupPage() {
    // Estado para armazenar o email, senha e mensagens de feedback do processo de cadastro.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // useNavigate permite a navegação para outras páginas programaticamente.
    const navigate = useNavigate();

    // Função que lida com o envio do formulário.
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão de recarregar a página ao enviar o formulário.

        try {
            // Faz uma requisição POST para a API que cria um novo usuário.
            const response = await fetch("http://localhost:4000/users/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Define o cabeçalho indicando que o corpo da requisição será em JSON.
                },
                // Envia o email e senha no corpo da requisição.
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            // Verifica se o cadastro foi bem-sucedido com os status 200 ou 201.
            if (response.status === 200 || response.status === 201) {
                setMessage("Cadastro realizado com sucesso!"); // Exibe uma mensagem de sucesso.
                navigate('/login'); // Navega automaticamente para a página de login.
            }

            // Acessa os dados retornados pela API, caso seja necessário.
            const data = await response.json();
            console.log('Response:', data); // Exibe os dados da resposta no console para debug.
        } catch (error) {
            // Verifica se houve um erro de conflito (status 409), indicando que o email já está cadastrado.
            if (error.response && error.response.status === 409) {
                setMessage("Email já cadastrado."); // Exibe uma mensagem de email duplicado.
            } else {
                setMessage("Cadastro falhou. Por favor, tente novamente."); // Exibe uma mensagem genérica de falha.
            }
            console.log(error); // Exibe o erro no console para debug.
        }
    };

    // Retorna o JSX que define a estrutura da página de cadastro.
    return (
        <div className="container">
            <div className="card">
                {/* Título da seção de cadastro */}
                <h2 className="section-title red-dot">Cadastro</h2>
                {/* Formulário de cadastro com campo para email e senha */}
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-input">
                        <label>Email:</label>
                        <input
                            type='email'
                            value={email} // O valor do input é o estado do email.
                            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email quando o usuário digita.
                            required
                        />
                    </div>
                    <div className="form-input">
                        <label>Senha:</label>
                        <input
                            type="password"
                            value={password} // O valor do input é o estado da senha.
                            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha quando o usuário digita.
                            required
                        />
                    </div>
                    <p className="switch">
                        {/* Link para a página de login, caso o usuário já tenha cadastro */}
                        Já está cadastrado?
                        <Link className="link" to="/login">Login</Link>
                    </p>
                    {/* Botão de enviar para cadastrar */}
                    <button className="submit btn" type="submit">Cadastrar</button>
                </form>
                {/* Botão de informações adicionais do usuário */}
                <UserInfoButton />
                {/* Exibe a mensagem de feedback se houver uma */}
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}
