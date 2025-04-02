import React, { useContext } from 'react'
import { HospitalContext } from '../../../Context/HospitalContextProvider'
import API from '../../../API\'s/AuthAPI'


function HospitalMainpage() {
    const {hospitaluser}= useContext(HospitalContext)
  return (
    <div className=' -mt-14'>
       <div className="h-screen flex justify-center items-center">
      <div className="relative max-w- mx-auto w-full">
        <img
          className="h-[80vh] w-full object-cover rounded-md"
          src={`${API}${hospitaluser?.hospitalImage}`}
          alt="Random image"
        />
        <div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-green-900 bg-white/50 w-[98%]  rounded-lg flex justify-center py-2  text-3xl font-bold">
            {hospitaluser.hospitalName} 
          </h2>
        </div>
      </div>
    </div>
       <h2 className='flex w-full px-10 -mt-10 py-2 '>
          About Hospital : {hospitaluser.about}
       </h2>
      
    </div>
  )
}

export default HospitalMainpage
