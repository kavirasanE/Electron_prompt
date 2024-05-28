import React from 'react'
import Open from './components/Open'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Takelogs from './pages/Takelogs'
import Logs from './pages/Logs'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Open/>}/>
          <Route path='/Home' element={<Home />}/>
          <Route path='/logs' element={<Takelogs />}/>
          <Route path='/demo' element={<Logs />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
