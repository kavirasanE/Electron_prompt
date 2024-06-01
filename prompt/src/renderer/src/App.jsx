import React from 'react'
import Open from './components/Open'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Takelogs from './pages/Takelogs'
import ConnectedDevices from './pages/ConnectedDevices'
import Commands from './pages/Commands'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Open />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/logs" element={<Takelogs />} />
          <Route path="/connectdevice" element={<ConnectedDevices />} />
          <Route path="/commands" element={<Commands />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
