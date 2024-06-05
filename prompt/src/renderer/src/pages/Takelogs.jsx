import React, { useEffect, useState } from 'react'
import { Online } from '../components/Sidebar'
import { Link } from 'react-router-dom'
import { Button, Label } from 'flowbite-react'
import {encode, decode} from "messagepack";

const Takelogs = () => {
  const [folder, setFolder] = useState('')
  const [display, setDisplay] = useState('')

 
  // const bin1 = encode({foo: 7, bar: "seven"});
  // console.log("encdeobj",bin1);
  // const obj = decode(bin1);
  // console.log("decode obj",obj);
   
  // const bin2 = encode("foobar");
  // console.log("encode value",bin2);
  // const str = decode(bin2);
  // console.log("decode string",str);





  window.socket.device((err, output) => {
    if (err) {
      console.log(err)
    } else {
      setDisplay(output)
      // console.log(display)
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
  const handleLogs = () => {
    console.log('dumpsys')
    setDisplay('dumpsys')
    let logcatCommand ="logcat -v threadtime"
    window.electron.ipcRenderer
      .invoke('runninglog', logcatCommand)
      .then((res) => {
        console.log(res);
       
        // console.log(outputCommand)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <div className="flex justify-between">
        <Online />
      </div>
      <div className="px-24 pt-5 flex flex-col">
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
      <Button className="m-5" onClick={handleLogs}>
        Connected Devices
      </Button>
      <div className="border border-gray-300 bg-black/90 mx-10 mt-10 h-96 overflow-y-auto p-2 rounded-xl">
        <pre className="text-white">{display}</pre>
      </div>
    </div>
  )
}

export default Takelogs
