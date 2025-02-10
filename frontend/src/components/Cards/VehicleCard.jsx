import React from 'react'

const VehicleCard = ({image, vehicleName, vehiclePrice, arrivalMinutes, message, onClick}) => {
  return (
    <div 
        className={`flex gap-2 shadow-md p-2 border-2 border-black rounded-md`}
    >
        <div className='w-20 flex-initial'>
            <img className='w-full' src={image} alt="Moto" />
        </div>
        <div className='flex-1 leading-5'>
            <div className='flex justify-between text-lg'>
                <p className='font-bold'>{vehicleName}</p>
                <p className='font-bold'>${vehiclePrice}</p>
            </div>
            <p className='text-sm text-black'>{arrivalMinutes} minutes away</p>
            <p className='text-sm text-gray-600'>{message}</p>
        </div>
    </div>
  )
}

export default VehicleCard