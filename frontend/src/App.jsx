import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserrProtectedWrapper from './UserrProtectedWrapper'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Start />} /> 
      <Route path='/user/login' element={<UserLogin />} /> 
      <Route path='/user/signup' element={<UserSignup />} /> 
      <Route path='/captain/login' element={<CaptainLogin />} /> 
      <Route path='/captain/signup' element={<CaptainSignup />} /> 
      <Route path='/home' element={
        <UserrProtectedWrapper>
          <Home />
        </UserrProtectedWrapper>
      } />
    </Routes>
  )
}

export default App