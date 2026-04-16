import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GlobalProvider } from './contexts/BirthdayContext'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import NewPersonPage from './pages/NewPersonPage'
import ListPage from './pages/ListPage'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <>
      <GlobalProvider>
      <BrowserRouter>
        <NavBar />

        <Routes>

          <Route path='/login' element={<LoginPage />} />

          <Route
            path='/'
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path='/new'
            element={
              <ProtectedRoute>
                <NewPersonPage />
              </ProtectedRoute>
            }
          />

          <Route
            path='/list'
            element={
              <ProtectedRoute>
                <ListPage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </GlobalProvider>
    </>
  )
}

export default App
