import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import CaptainHome from './pages/CaptainHome'
import UserrProtectedWrapper from './protectedRoutes/UserrProtectedWrapper'
import CaptainProtectedWrapper from './protectedRoutes/CaptainProtectedWrapper'
import VerifyUserLogin from './protectedRoutes/VerifyUserLogin'
import Go from './pages/go'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Start />} /> 
      <Route path='/user/login' element={
        <VerifyUserLogin>
          <UserLogin />
        </VerifyUserLogin>
      } /> 
      <Route path='/user/signup' element={
        <VerifyUserLogin>
          <UserSignup />
        </VerifyUserLogin>
      } /> 
      <Route path='/captain/login' element={<CaptainLogin />} /> 
      <Route path='/captain/signup' element={<CaptainSignup />} /> 
      <Route path='/home' element={
        <UserrProtectedWrapper>
          <Home />
        </UserrProtectedWrapper>
      } />
      <Route path='/captain/home' element={
        <CaptainProtectedWrapper>
          <CaptainHome />
        </CaptainProtectedWrapper>
      } />
      <Route path='/go' element={
        <UserrProtectedWrapper>
          <Go />
        </UserrProtectedWrapper>
      } /> 
    </Routes>
    
  )
}

export default App