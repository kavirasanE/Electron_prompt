import React from 'react'
import Open from './components/Open'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Takelogs from './pages/Takelogs'
import ConnectedDevices from './pages/ConnectedDevices'
import Commands from './pages/Commands'
// import Socket from './Socket'
// import Logs from './pages/Logs'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Open />} />
          {/* <Route path="/" element={<Socket />} /> */}
          <Route path="/Home" element={<Home />} />
          <Route path="/logs" element={<Takelogs />} />
          <Route path="/connectdevice" element={<ConnectedDevices />} />
          <Route path="/commands" element={<Commands />} />
          {/* <Route path='/demo' element={<Logs />}/> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
