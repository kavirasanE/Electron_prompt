import React, { useEffect, useState } from 'react';
import { Online } from '../components/Sidebar';

const ConnectedDevices = () => {
  const [connectedDevices, setConnectedDevices] = useState([]);

  useEffect(() => {
    // Call the connect function from main process
    window.electron.ipcRenderer.invoke('connect').then((result) => {
      // Update state when a device is plugged or unplugged
      if (result.status === 'plugged') {
        // Check if the device is already in the state
        if (!connectedDevices.includes(result.deviceId)) {
          // Device is connected and not in the state, add it
          setConnectedDevices((prevDevices) => [...prevDevices, result.deviceId]);
        }
      } else if (result.status === 'unplugged') {
        // Device is removed, remove it from state
        setConnectedDevices((prevDevices) =>
          prevDevices.filter((deviceId) => deviceId !== result.deviceId)
        );
      }
    });

    // Clean up function to remove event listeners
    return () => {
      // Cleanup logic here if needed
    };
  }, []); // Empty dependency array to run effect only once

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
