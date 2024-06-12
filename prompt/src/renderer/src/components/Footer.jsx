import React from 'react'

const Footer = () => {
  let currentDate = new Date()
  let currentYear = currentDate.getFullYear()
  return (
    <div className=' bottom-1'>
      <p className=" border border-t-0 mx-10 border-black"></p>
      <p className="flex justify-center items-center text-sm p-2">
        Designed and Developed by WHA Team {currentYear}. &reg;All
        Right Reserved
      </p>
    </div>
  )
}

export default Footer
