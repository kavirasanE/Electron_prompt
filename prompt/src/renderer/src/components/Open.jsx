import React, { useState } from 'react'
import Versions from './Versions'
import '../assets/main.css'
import electronLogo from '../assets/electron.svg'
import './open.css'
import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react'
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
  }
  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator"></div>
      <div className="text">
        Welcome to <span className="react">promptworks</span>
      </div>
      {/* <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p> */}

      <div className="button">
        <Button
          href="/Home"
          className="bg-blue-900  px-20 m-10"
        >
          <span className="text-xl font-medium subpixel-antialiased"> Get Started</span>
        </Button>
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

      {/* <Versions></Versions> */}
    </>
  )
}

export default Open
