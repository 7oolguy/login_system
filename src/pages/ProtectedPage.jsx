// Importa React e os hooks useEffect e useState para gerenciar o estado e efeitos colaterais,
// bem como o useAuth para acessar o contexto de autenticação e os componentes LogoutButton e UserInfoButton.
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "../components/LogoutButton";
import UserInfoButton from "../components/UserInfoButton";

// Componente funcional que representa uma página protegida (somente acessível a usuários autenticados).
export default function ProtectedPage() {
    // Cria um estado local 'user' para armazenar as informações do usuário.
    const [ user, setUser ] = useState(null);

    // Hook useEffect para buscar as informações do usuário assim que o componente for montado.
    useEffect(() => {
        const fetchUserInfo = async () => {
            // Obtém o token de autenticação armazenado localmente no navegador (localStorage).
            const token = localStorage.getItem('token');
            try {
                // Faz uma requisição para o backend para obter informações do usuário autenticado.
                const response = await fetch('http://localhost:4000/users/me', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Envia o token no cabeçalho da requisição para autenticação.
                    },
                });

                // Converte a resposta da API para JSON.
                const data = await response.json();
                // Armazena os dados do usuário no estado 'user'.
                setUser(data);
            } catch (error) {
                // Exibe um erro no console caso a requisição falhe.
                console.log('Error fetching user info:', error);
            }
        };

        // Chama a função que busca as informações do usuário.
        fetchUserInfo();
    }, []); // O array vazio significa que o efeito será executado apenas uma vez após a montagem do componente.

    // Verifica se os dados do usuário ainda não foram carregados, e enquanto isso exibe uma mensagem de "Loading...".
    if (!user) {
        return <div>Loading...</div>;
    }

    // Retorna a interface da página protegida, exibindo as informações do usuário quando os dados estão disponíveis.
    return (
        <div className="container">
            <div className="card">
               {/* Exibe o título da página */}
               <h1 className="page-title">Perfil Info</h1>
               {/* Exibe o email do usuário autenticado */}
                <p className="page-text"><strong>Email:</strong> {user.email}</p>
                {/* Botão de logout */}
                <LogoutButton />
            </div>
            
            {/* Componente que exibe informações adicionais do usuário */}
            <UserInfoButton />
        </div>
    );
}
