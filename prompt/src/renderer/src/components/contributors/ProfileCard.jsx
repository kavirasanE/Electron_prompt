import React from 'react'
import amazon from "../../assets/amazon.png"
const ProfileCard = () => {
  return (
    <div className='m-3'>
       <div className='w-36  h-72 border-4 border-blue-500 bg-black rounded-xl p-3'>
             <p className='w-20 h-5 border-4 border-blue-700 bg-white mx-4 rounded-xl'></p>
             <p className='text-white text-center font-normal p-1'>Amazon</p>
             <img src={amazon} className='object-contain pt-7'/>
             <p className='text-white text-center font-light p-1'>@amazon</p>
       </div> 
    </div>
  )
}

export default ProfileCard