import React, { useEffect, useState } from 'react'
import { Online } from '../components/Sidebar'
import DeviceAcordian from '../components/ConnectedDevices/DeviceAcordian'

const ConnectedDevices = () => {
  const [devices, setDevices] = useState([])
  const [data, setData] = useState([])
  // console.log(window.deviceConnect)
  const getBuildDetails = async (callback) => {
    await window.deviceConnect.device((datas, output) => {
      if (datas) {
        console.log(datas)
      } else {
        const outputString = String(output)
        setData(outputString)
        let obj = outputString.split('\n')
        console.log(obj)
        let next = obj[0].split(' ')
       let devicename = obj[17].split(' ')
       console.log(devicename[1])
        let build = obj[29].split(' ')
        console.log(next[1].toString())
        // let last = next[1];

        const buildDetails = {
deviceName:devicename[1],
          build: build[1],
          version: next[0]
        }
        if (callback) callback(buildDetails)
      }
    })
  }

  // getBuildDetails();
  console.log(devices)
  const trackDevice = () => {
    window.deviceConnect.connectedDevice((data, output) => {
      if (data) {
        setDevices((prevDevices) => {
          if (data.status === 'plug') {
            getBuildDetails((buildDetails) => {
              if (buildDetails) {
                const UpdatedData = { ...data, ...buildDetails }
                if (!prevDevices.some((device) => device.id === data.id)) {
                  setDevices([...prevDevices, UpdatedData])
                }
              }
            })
          } else if (data.status === 'unplug') {
            return prevDevices.filter((device) => device.id !== data.id)
          }
          return prevDevices
        })
      } else {
        console.log(output)
      }
    })
  }
  
  useEffect(() => {
    trackDevice()
  }, [devices])

  return (
    <div className="">
      <Online />
      <div className="p-5">
        <div>
          <p className="font-bold text-2xl">Connected Devices :</p>
        </div>
        <div>
          {devices.map((device, index) => (
            <div key={device.id} className="">
              <DeviceAcordian device={device} index={index} />
              <p>{device.id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ConnectedDevices
