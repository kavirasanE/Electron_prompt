import React, { useContext } from 'react'
import { DataContext } from '../context/DataProvider'
import { MdOutlinePauseCircleOutline } from 'react-icons/md'
import { GrResume } from 'react-icons/gr'
import { MdContentCopy } from "react-icons/md";

const OutputLogs = ({ output }) => {
  const { commandstoOuput, setPauseRunningCommand, pauseRunningCommand } = useContext(DataContext)

  return (
    <div className="text-white">
      <p className="bg-white/20 p-2  font-medium subpixel-antialiased flex justify-between items-center">
        {/* <span>Connected Device:</span>
      <span>DSN:</span> */}
        <button onClick={() => setPauseRunningCommand(!pauseRunningCommand)} className='text-yellow-200  rounded-sm text-xl p-1 '>
          {pauseRunningCommand ? <MdOutlinePauseCircleOutline /> : <GrResume />}
        </button>
        <button className='flex items-center gap-1 px-4 text-sm font-normal'><MdContentCopy /> Copy</button>
      </p>
      <pre className="text-yellow-200 truncate p-2">
          <span>Command : </span>
          {commandstoOuput}
        </pre>
      <pre className="p-5 break-all text-wrap">
        {output}
      </pre>
    </div>
  )
}

export default OutputLogs
