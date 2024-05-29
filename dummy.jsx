
import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Online } from './Sidebar'

export default function Home() {
  const [command, setCommand] = useState('')
  const [data, setData] = useState('no data displayed')
  console.log(window)

  const handleSend = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const serializableCommand = JSON.stringify({ command })
    window.electron.ipcRenderer
      .invoke('command', serializableCommand)
      .then((res) => {
        const parsedResponse = JSON.parse(res)
        console.log(parsedResponse)
        setData(parsedResponse)
        // setData(res)
      })
      .catch((err) => {
        setData(err)
        console.log(err)
      })
  }

  return (
    <div className="bg-white w-screen h-screen p-5">
      <div className="flex justify-between ">
        <Online />
        <Link to="/" className="p-2 border-2 rounded-lg text-white bg-black/80">
          Back to Home
        </Link>
      </div>
      <div className="px-24 pt-5">
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label value="Test your commands here" />
            </div>
            <TextInput
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="getprop | grepbuild"
              required
            />
          </div>
          <Button type="submit" onClick={handleSend}>
            Submit
          </Button>
        </form>
      </div>
            <div className="border border-gray-300 bg-black/90 mx-10 mt-10 h-96 overflow-y-auto p-2 rounded-xl">
        <pre className='text-white/80'>{data}</pre>
      
      </div>
    </div>
  )
}
















