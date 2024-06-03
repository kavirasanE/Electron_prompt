import React from 'react'
import { Accordion, Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
const DeviceAcordian = ({ device, index }) => {
  console.log(device, 'output from accordian')
  return (
    <div className="p-5">
      <Accordion>
        <Accordion.Panel>
          <Accordion.Title className="bg-blue-800 text-white hover:bg-blue-800 ">
            <div className="w-[600px] flex flex-row items-center justify-between ">
              <p>
                Device Name: <span>{device.id}</span>
              </p>
              <p>
                DSN: <span>{device.type} </span>
              </p>
            </div>
          </Accordion.Title>
          <Accordion.Content>
            <div className="font-bold text-xl px-5">
              <div className="flex flex-row justify-between items-center">
                <p>
                  Build Details: <span>{device.build}</span>
                </p>
                <p>OS:</p>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row justify-start items-center gap-10 p-5">
                  <Button color="dark">
                    <Link to="/logs">Take Logs</Link>
                  </Button>
                  <Button color="dark">
                    <Link to="/commands"> Check Commands</Link>
                  </Button>
                </div>
                <p>Build Variant:</p>
              </div>
            </div>
            {/* <p> {device.status}</p>
            <p>{device.type}</p> */}
            {/* {index} */}
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  )
}

export default DeviceAcordian
