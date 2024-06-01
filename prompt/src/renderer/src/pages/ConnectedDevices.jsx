import React, { useEffect, useState } from 'react';
import { Online } from '../components/Sidebar';

const ConnectedDevices = () => {
  const [connectedDevices, setConnectedDevices] = useState([]);

  useEffect(() => {
   
    window.electron.ipcRenderer.invoke('connect').then((result) => {
     
      if (result.status === 'plugged') {
        
        if (!connectedDevices.includes(result.deviceId)) {
          
          setConnectedDevices((prevDevices) => [...prevDevices, result.deviceId]);
        }
      } else if (result.status === 'unplugged') {
        setConnectedDevices((prevDevices) =>
          prevDevices.filter((deviceId) => deviceId !== result.deviceId)
        );
      }
    });

    return () => {
    };
  }, []); 

  return (
    <>
    <Online />
    <div className="bg-white w-screen text-black h-screen p-5">
      <div>
        <p>Connected Devices :</p>
        {connectedDevices.map((device, index) => (
          <p key={index}>{device}</p>
        ))}
      </div>
    </div>
    </>
  );
};

export default ConnectedDevices;
