import React, { useEffect } from 'react'
import { Online } from '../components/Sidebar'


const handleConnect = () => {
  window.electron.ipcRenderer.invoke('connect', 'requestData').then((res) => {
    console.log('Response Data:', res)
  })
}

const ConnectedDevices = () => {

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleConnect()
    }, 2000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="bg-white w-screen text-black h-screen p-5">
      <Online />
      <div>
        <p>Connected Devices :</p>
      </div>
    </div>
  )
}

export default ConnectedDevices


