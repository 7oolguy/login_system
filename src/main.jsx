import { StrictMode } from 'react' // Importa StrictMode para verificar possíveis problemas.
import { createRoot } from 'react-dom/client' // Nova API do React para renderização de componentes.
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Ferramentas de roteamento.
import './index.css' // Importa o arquivo de estilos.

import { AuthProvider } from './context/AuthContext'; // Contexto de autenticação.

import WelcomePage from './pages/WelcomePage'; // Importa as páginas da aplicação.
import PageNotFound from './error/PageNotFound';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute'; // Importa o componente que protege rotas.
import SignupPage from './pages/SignupPage';
import ProtectedPage from './pages/ProtectedPage';

// Definição das rotas usando createBrowserRouter.
const router = createBrowserRouter([
  {
    path: '/', // Rota inicial.
    element: (
      <ProtectedRoute> {/* Protege a rota inicial com autenticação. */}
        <WelcomePage /> {/* Página inicial protegida. */}
      </ProtectedRoute>
    ),
    errorElement: <PageNotFound /> // Componente exibido se a rota não for encontrada.
  },
  {
    path: '/login', // Rota para a página de login.
    element: <LoginPage />, // Página de login.
  },
  {
    path: '/signup', // Rota para a página de cadastro.
    element: <SignupPage /> // Página de cadastro.
  },
  {
    path: '/protected', // Rota para a página protegida.
    element: (
      <ProtectedRoute> {/* Protege a rota da página protegida. */}
        <ProtectedPage /> {/* Página protegida. */}
      </ProtectedRoute>
    ),
  },
])

// Renderiza a aplicação dentro da div root.
createRoot(document.getElementById('root')).render(
  <StrictMode> {/* Executa os componentes no modo estrito. */}
    <AuthProvider> {/* Contexto de autenticação envolvido pela aplicação. */}
      <RouterProvider router={router}/> {/* Define o provedor de rotas com as rotas definidas. */}
    </AuthProvider>
  </StrictMode>,
)
