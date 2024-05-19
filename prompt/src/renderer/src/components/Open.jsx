import React, { useState } from 'react'
import Versions from './Versions'
import '../assets/main.css'
import electronLogo from '../assets/electron.svg';
import "./open.css"
import { Link } from 'react-router-dom';
const Open = () => {
  const [data, setData] = useState()
  const ipcHandle = () => {
    window.electron.ipcRenderer.send('ping')
    // console.log(window.electron.ipcRenderer)
  }
  const handleAdb = () => {
    window.electron.ipcRenderer.invoke('adb', 'requestData').then((res) => {
      console.log('Response Data:', res)
      setData(res)
    })
    // console.log(window)
  }
  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Welcome to promptworks</div>
      <div className="text">
        Build an Electron app with <span className="react">Kavirasan</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <Link to="/Home">Get Started</Link>
        </div>
        {/* <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div> */}
        {/* <button onClick={handleAdb} className="p-4 bg-white text-black">
          adb
        </button>
        {data ? <p> Data is {data}</p> : <p>No data</p>} */}
      </div>
      <Versions></Versions>
 
    </>
  )
}

export default Open



