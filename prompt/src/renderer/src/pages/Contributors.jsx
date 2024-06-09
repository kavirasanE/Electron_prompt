import React, { useState } from 'react'
import { Online } from '../components/Sidebar'
import ProfileCard from '../components/contributors/ProfileCard'
import Marquee from 'react-fast-marquee'
import goodwin from "../assets/teamphoto/goodwin.jpg"
import sathish from "../assets/teamphoto/sathish.jpg"
import sowbar from "../assets/teamphoto/sowbar.jpg"
import suriyakala from "../assets/teamphoto/suriyakala.jpg"
import benisha from "../assets/teamphoto/benisha.jpg"
import saravana from "../assets/teamphoto/saravana.jpg"
import priya from "../assets/teamphoto/priya.jpg"
import dayalu from "../assets/teamphoto/dayalu.jpg"
import monica from "../assets/teamphoto/monica.jpg"
import subaash from "../assets/teamphoto/subaash.jpg"
import sriram from "../assets/teamphoto/sriram.jpg"
import niranjan from "../assets/teamphoto/niranjan.jpg"
import kavirasa from "../assets/teamphoto/kavirasa.jpg"
import praveen from "../assets/teamphoto/praveen.jpg"
import joseph from "../assets/teamphoto/joseph.jpg"
import asha from "../assets/teamphoto/asha.jpg"
import john from "../assets/teamphoto/john.jpg"


const Contributors = () => {
  const Seniorwhateam = [
    {
      name: "Satheesh G",
      photo: sathish, // Assuming this is a variable or a placeholder for the actual photo URL
      username: "sathguna",
      years: 5
    },
    {
      name: "SOWBARANEKA N.V",
      photo: sowbar, // Assuming this is a variable or a placeholder for the actual photo URL
      username: "sowbar",
      years: 5
    },
    {
      name: "Suriyakala V",
      photo: suriyakala, // Assuming this is a variable or a placeholder for the actual photo URL
      username: "vsuriya",
      years: 5
    },
    {
      name: "Benisha J",
      photo: benisha, // Assuming this is a variable or a placeholder for the actual photo URL
      username: "benishj",
      years: 4
    },
    {
      name: "Saravanakumar N",
      photo: saravana, // Assuming this is a variable or a placeholder for the actual photo URL
      username: "nasrav",
      years: 4
    },
    {
      name: "Priyadharsini Paramasivam",
      photo: priya, // Assuming this is a variable or a placeholder for the actual photo URL
      username: "papriyad",
      years: 4
    },
    {
      name: "R, DAYALU",
      photo: dayalu, // Assuming this is a variable or a placeholder for the actual photo URL
      username: "zrdayal",
      years: 4
    },
    {
      name: "Monica Gauthama",
      photo: monica, // Assuming this is a variable or a placeholder for the actual photo URL
      username: "mggautha",
      years: 4
      
    }
  ];

  const deviceassociate = [
    {
      name: "Goodwin A",
      photo: goodwin, // Assuming this is a variable or a placeholder for the actual photo URL
      username: "goodwira",
      years: 2
    },
    {
      name: "Subaash K",
      photo: subaash, // Assuming this is a variable or a placeholder for the actual photo URL
      username: "ksubaasq",
      years: 3
    },
    {
    name: "Sriram V",
    photo: sriram, // Assuming this is a variable or a placeholder for the actual photo URL
    username: "jvsrira",
    years: 3
  },
  {
    name: "NIRANJAN IMMANUVEL",
    photo: niranjan, // Assuming this is a variable or a placeholder for the actual photo URL
    username: "niranimm",
    years: 2
  },
  {
    name: "KAVIRASAN E",
    photo: kavirasa, // Assuming this is a variable or a placeholder for the actual photo URL
    username: "kavirasa",
    years: 2
  },
    
  ]

  const otherAssociates = [
    {
      name: "praveen j",
      photo: praveen, // Assuming this is a variable or a placeholder for the actual photo URL
      username: "praveejh",
      years: 2
    },
    {
      name: "Johnson Paul",
      photo: john, // Assuming this is a variable or a placeholder for the actual photo URL
      username: "ashokajo",
      years: 2
    },
    {
      name: "G.JOSEPH",
      photo: joseph, // Assuming this is a variable or a placeholder for the actual photo URL
      username: "gzjosep",
      years: 5
    },
    {
      name: "Asha J",
      photo: asha, // Assuming this is a variable or a placeholder for the actual photo URL
      username: "ashajaya",
      years: 5
    },
    
    
  ]
  

  return (
    <div>
      <Online />
      <p className="font-bold text-3xl p-2 text-center ">Meet Our Team</p>
      <p className="border mx-10 border-b-0 border-black"></p>
      <p className="font-bold p-2 text-xl underline"> Alexa Whole Home Audio (WHA)</p>
      <p className="font-bold p-1 text-center text-lg underline italic">Senior Device Associates</p>
      <div className=" p-2 grid grid-cols-5 justify-center items-center ">
     
        {Seniorwhateam.map((data, index) => (
          <ProfileCard data={data} key={index} />
        ))}
      
      </div>
      <p className="border mx-10 border-b-0 border-black"></p>
      <p className="font-bold p-1 text-center text-lg underline italic"> Device Associates</p>
      <div className=" p-2 grid grid-cols-5 ">
      
        {deviceassociate.map((data, index) => (
          <ProfileCard data={data} key={index} />
        ))}
     
      </div>
      <p className="border mx-10 border-b-0 border-black"></p>
      <div>
      
      <p className="font-bold p-2 text-xl underline italic">Singleton & MultiModal Team:</p>
      <div className=" p-2 flex flex-row ">
     
        {otherAssociates.map((data, index) => (
          <ProfileCard data={data} key={index} />
        ))}
    
      </div>
      </div>
     
    </div>
  )
}

export default Contributors
