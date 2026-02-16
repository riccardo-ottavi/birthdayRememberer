import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GlobalProvider } from './contexts/BirthdayContext'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import NewPersonPage from './pages/NewPersonPage'
import ListPage from './pages/ListPage'

function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/new' element={<NewPersonPage />} />
            <Route path='/list' element={<ListPage />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
