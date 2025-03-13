import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, Register } from './components'
import { UserContextProvider } from './middleware/UserContext'

function App() {

  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route path='/' element={<Login />} ></Route>
            <Route path='/register' element={<Register />} ></Route>
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
