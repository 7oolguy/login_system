# React + Vite
Este template fornece uma configuração mínima para usar React no Vite com HMR (Hot Module Replacement) e algumas regras do ESLint.

### Atualmente, dois plugins oficiais estão disponíveis:

- @vitejs/plugin-react usa Babel para Fast Refresh.
- @vitejs/plugin-react-swc usa SWC para Fast Refresh.

## Sistema de Login com React + Vite
Este projeto tem como objetivo criar um sistema de login simples utilizando React e Vite para o frontend. O backend já está disponível, e a comunicação entre o frontend e o backend é feita através de APIs REST, utilizando autenticação baseada em tokens.

### Tecnologias Utilizadas
- Frontend: React + Vite
- Linguagem: JavaScript/TypeScript
- Estilização: CSS Modules / Styled Components
- Autenticação: JWT (JSON Web Token)
- Ferramentas: ESLint, Prettier, Axios
### Funcionalidades
- Página de login com autenticação de usuário
- Página de cadastro para novos usuários
- Manutenção do estado do usuário autenticado utilizando AuthContext
- Rotas protegidas utilizando react-router-dom
- Armazenamento e atualização de tokens JWT e refresh tokens
- Exibição de informações do usuário após o login bem-sucedido
## Como Rodar o Projeto
Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```
# Instale as dependências:

```bash
npm install
```
### Execute o projeto:

```bash
npm run dev
```
### Build para produção:

```bash
npm run build
```
## Estrutura de Pastas
```graphql
src/
│
├── components/     # Componentes reutilizáveis
├── pages/          # Páginas (Login, Cadastro, Home, etc.)
├── context/        # AuthContext para gerenciamento de autenticação
├── services/       # Funções de API (Login, Logout, Registro, etc.)
├── routes/         # Configuração de rotas protegidas e públicas
└── main.jsx        # Arquivo de entrada principal
```
## Licença
Este projeto está licenciado sob a MIT License.

