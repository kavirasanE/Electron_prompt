import React from 'react'
import { Online } from '../components/Sidebar'
import ProfileCard from '../components/contributors/ProfileCard'
import Marquee from 'react-fast-marquee'

const Contributors = () => {
  return (
    <div>
    <Online/>
    <p>Contributors:</p>
    <div className='p-2 flex flex-row'>
    <Marquee autoFill direction='right'>
    <ProfileCard/>
    <ProfileCard/>
    <ProfileCard/>
    <ProfileCard/>
    <ProfileCard/>
    <ProfileCard/>
    </Marquee>
    </div>
    </div>
  )
}

export default Contributors