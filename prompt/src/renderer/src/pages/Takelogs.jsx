import React, { useEffect, useState } from 'react'
import { Online } from '../components/Sidebar'
import { Link } from 'react-router-dom'
import { Button, Label } from 'flowbite-react'

const Takelogs = () => {
  const [folder, setFolder] = useState('')
  const [display, setDisplay] = useState('')

  window.socket.device((err, output) => {
    if (err) {
      console.log(err)
    } else {
      setDisplay(output)
      console.log(display)
    }
  })

  const handleChange = (e) => {
    const fileName = e.target.files[0].name
    const res = e.target.files[0].path
    const lastIndex = res.lastIndexOf('\\')

    if (lastIndex !== -1) {
      setFolder(res.substring(0, lastIndex + 1))
      console.log(res.substring(0, lastIndex + 1))
    } else {
      console.log(res)
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <Online />
      </div>
      <div className="px-24 pt-5 flex flex-col">
        {/* <pre className="text-black"> hi from electron</pre> */}

        <Label
          htmlFor="large-folder-upload"
          value="Select a Folder"
          className="font-semibold text-lg"
        />

        <input
          type="file"
          webkitdirectory="true"
          dir="true"
          title="Choose a Folder"
          onChange={handleChange}
          className="border border-black rounded-r-md  rounded-l-xl"
        />
        {folder && (
          <p className="text-black/80 font-bold p-2 px-4  border-r-2 border-b-2 rounded shadow-lg border-black/50 m-2 ">
            {folder}
          </p>
        )}
      </div>
      <Button className="m-5">Connected Devices</Button>
      <div className="border border-gray-300 bg-black/90 mx-10 mt-10 h-96 overflow-y-auto p-2 rounded-xl">
        <pre className="text-white/80">{display}</pre>
      </div>
    </div>
  )
}

export default Takelogs

{
  /* <div className='bg-white w-screen h-screen'>
    <div className='w-[450px] h-screen overflow-auto text-black '>
      <pre>{display}</pre>
    </div>
    </div> */
}
