import './App.css'
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthProvider } from "./contexts/AuthContext";
import { PeopleProvider } from "./contexts/PeopleContext";

import Header from './components/Header'
import HomePage from './pages/HomePage'
import NewPersonPage from './pages/NewPersonPage'
import ListPage from './pages/ListPage'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PeopleProvider>
          <Toaster position="top-right" />
          <Header />

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
        </PeopleProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App