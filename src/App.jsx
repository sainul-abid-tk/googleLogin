import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'
import Create from './pages/Create'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/landing' element={<LandingPage/>}/>
        <Route path='/create' element={<Create/>}/>
      </Routes>
    </>
  )
}

export default App
