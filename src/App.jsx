import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Login from "./pages/LogIn"
import SignUp from "./pages/SignUp"
import HomePage from "./pages/HomePage"
import ProtectedRoute from "./context/ProtectedRoute"
import ProtectedPage from "./pages/ProtectedPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<WelcomePage />} />
      </Routes>
    </Router>
  )
}

export default App
