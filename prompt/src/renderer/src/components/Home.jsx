import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import { useState } from 'react'

export default function Home() {
  const [command, setCommand] = useState('')
  const [data, setData] = useState('no data displayed')
  console.log(window)

  const handleSend = (e) => {
    e.preventDefault()
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
    <div>
      <div className=" px-24 pt-5">
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
