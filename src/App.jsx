import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Notfound from './pages/Notfound'
import MainLayout from './layouts/MainLayout'
const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />} >
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<Notfound />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
