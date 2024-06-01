import React, { useEffect, useState } from 'react'
import { Online } from '../components/Sidebar'
import DeviceAcordian from '../components/ConnectedDevices/DeviceAcordian'

const ConnectedDevices = () => {
  let status = []

  let [deviceStatus, setDeviceStatus] = useState([])

  const trackDevice = () => {
    window.deviceConnect.connectedDevice((data, output) => {
      if (data) {
        status.push(data)
        setDeviceStatus(true)
        // if (data.status == 'plug' && !deviceStatus.some((item) => item.data.id === data.id)) {
        //   setDeviceStatus((prev) => {
        //     return [...prev, { data }]
        //   })
        //    console.log(deviceStatus)
        // } else if (data.status == 'unplug') {
        //   const filterData = deviceStatus.filter((item) => item.data.id !== data.id)
        //   setDeviceStatus(filterData)
        // }
        // // status.push(data)
        // // console.log(status)
      } else {
        console.log(output)
      }
    })
  }
  useEffect(() => {
    trackDevice();
    // setDeviceStatus(status);
  },[status])
  // console.log(status);  

  return (
    <div className="">
      <Online />
      <div className=" p-5">
        <div>
          <p className="font-bold text-2xl">Connected Devices :</p>
        </div>
        <div>
          {/* {deviceStatus.map((device, index) => (
              <div className='text-black'>
            
                <DeviceAcordian device={device} index={index} />
              </div>
            ))} */}
            <DeviceAcordian/>
        </div>
      </div>
    </div>
  )
}

export default ConnectedDevices
