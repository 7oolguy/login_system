// Importa o hook useState do React para gerenciar estados locais, o Link e useNavigate do React Router para navegação, 
// e o hook useAuth do contexto de autenticação para lidar com o login.
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserInfoButton from "../components/UserInfoButton";

// Componente funcional responsável pela página de login
export default function LoginPage() {
    // Define os estados para armazenar o email, senha e uma mensagem de feedback para o usuário
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ message, setMessage ] = useState('');

    // Obtém a função de login do contexto de autenticação e a função de navegação do React Router
    const { login } = useAuth();
    const navigate = useNavigate();

    // Função responsável por lidar com o envio do formulário de login
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita o comportamento padrão de recarregar a página ao submeter o formulário

        try {
            // Faz uma requisição POST para a API de login com os dados de email e senha do usuário
            const response = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Define que os dados enviados são no formato JSON
                },
                body: JSON.stringify({
                    email,
                    password, // Envia os dados de email e senha no corpo da requisição
                }),
            });
        
            // Verifica se a resposta da API indica sucesso (códigos de status 200 ou 201)
            if (response.status === 200 || response.status === 201) {
                setMessage('Login bem sucedido'); // Exibe mensagem de sucesso ao usuário
                
                // Converte a resposta da API para JSON e extrai os dados
                const data = await response.json();
                const { token, refreshToken, email: userEmail } = data;
                
                // Exibe os dados recebidos no console (opcional, útil para depuração)
                console.log("Response Data:", data);
        
                // Chama a função de login com o token, refreshToken e email do usuário para atualizar o contexto de autenticação
                login({ email: userEmail, token, refreshToken });
        
                // Redireciona o usuário para a página inicial após o login bem-sucedido
                navigate('/');
            } else {
                // Se o login falhar (status diferente de 200 ou 201), exibe uma mensagem de erro
                setMessage("Falha no login, Por favor, verifique suas credenciais e tente novamente.");
            }
        } catch (error) {
            // Caso ocorra um erro na requisição (ex: problema de rede), exibe uma mensagem de erro
            setMessage("Falha no login, Por favor, verifique suas credenciais e tente novamente.");
            console.log(error); // Exibe o erro no console para depuração
        }
    };

    // Retorna o JSX para renderizar a interface da página de login
    return <>
        <div className="container">
            <div className="card">
               <h1 className="section-title red-dot">Login</h1>
                {/* Formulário de login, que chama handleSubmit ao ser submetido */}
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-input">
                        <label>Email:</label>
                        {/* Input para o email do usuário, com o valor controlado pelo estado 'email' */}
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado ao alterar o valor
                            required // Campo obrigatório
                        />
                    </div>
                    <div className="form-input">
                        <label>Password:</label>
                        {/* Input para a senha do usuário, com o valor controlado pelo estado 'password' */}
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado ao alterar o valor
                            required // Campo obrigatório
                        />
                    </div>
                    <p className="switch">
                        {/* Link para redirecionar o usuário para a página de cadastro, caso ainda não tenha conta */}
                        Não tem uma conta ainda?
                        <Link to="/signup" className="link">Sign-up.</Link>
                    </p>
                    {/* Botão para submeter o formulário de login */}
                    <button className="submit btn" type="submit">Login</button>
                </form>
                
                {/* Componente que exibe informações do usuário (caso necessário) */}
                <UserInfoButton />
                
                {/* Exibe a mensagem de feedback (sucesso ou erro) ao usuário, caso exista uma mensagem */}
                {message && <p className="message">{message}</p>} 
            </div>
        </div>
    </>
}
