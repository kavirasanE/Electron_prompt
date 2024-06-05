import React from 'react'

const OutputLogs = ({ output }) => {
  return (
    <div className="text-white">
      <p className="bg-white/20 p-2  font-medium subpixel-antialiased flex justify-between items-center">
      <span>Connected Device:</span>
      <span>DSN:</span>
       </p>
      <pre className='p-5 break-all text-wrap'>{output}</pre>
    </div>
  )
}

export default OutputLogs
