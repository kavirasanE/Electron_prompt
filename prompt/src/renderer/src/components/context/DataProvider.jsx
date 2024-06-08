import { createContext, useState } from 'react'

export const DataContext = createContext({})

const DataProvider = ({ children }) => {
  const [commandstoOuput, setCommandstoOutput] = useState()
  const [pauseRunningCommand, setPauseRunningCommand] = useState(true)
  const [listDevices,setListDevices] =useState([]);

  return (
    <DataContext.Provider
      value={{
        commandstoOuput,
        setCommandstoOutput,
        pauseRunningCommand,
        setPauseRunningCommand,
        listDevices,
        setListDevices
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
