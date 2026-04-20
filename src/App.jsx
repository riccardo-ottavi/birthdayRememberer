import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthProvider } from "./contexts/AuthContext";
import { PeopleProvider } from "./contexts/PeopleContext";

import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import NewPersonPage from './pages/NewPersonPage'
import ListPage from './pages/ListPage'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <PeopleProvider>
        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />

            <Route path="/new" element={
              <ProtectedRoute>
                <NewPersonPage />
              </ProtectedRoute>
            } />

            <Route path="/list" element={
              <ProtectedRoute>
                <ListPage />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </PeopleProvider>
    </AuthProvider>
  )
}

export default App