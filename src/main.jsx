import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

import { AuthProvider } from './context/AuthContext';

import WelcomePage from './pages/WelcomePage';
import PageNotFound from './error/PageNotFound';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import SignupPage from './pages/SignupPage';
import ProtectedPage from './pages/ProtectedPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <WelcomePage />
      </ProtectedRoute>
    ),
    errorElement: <PageNotFound />
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/protected',
    element: (
      <ProtectedRoute>
        <ProtectedPage />
      </ProtectedRoute>
    ),
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
