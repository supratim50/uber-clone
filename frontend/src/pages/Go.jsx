import React, { useRef, useState } from 'react'
import VehicleCard from '../components/Cards/VehicleCard';

import uberAuto from "../assets/uber-auto.jpg";

const Go = () => {

    const [selection, setSelection] = useState("");
    
  return (
    <div className='w-full h-screen'>
            {/* tmporary image */}
            <img 
            className='w-full h-[30%] object-cover'
                src="https://www.thestatesman.com/wp-content/uploads/2020/04/googl_ED.jpg" 
                alt="Map" 
            />

            <div className='h-[70%] bg-white rounded-t-2xl p-2 shadow-lg overflow-hidden'>
                <div className="py-3 border-b rounded-t-2xl border-gray-300 mb-3">
                    <h3 className='text-center text-md font-semibold'>Choose a ride</h3>
                </div>

                <div className="bg-white flex flex-col gap-2">
                    {/* cards */}
                    <VehicleCard
                        image={"https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png"}
                        vehicleName="Moto"  
                        vehiclePrice="115"
                        arrivalMinutes="7"
                        message="Affordable, motorcycle rides"
                        onClick={setSelection}
                    />
                    <VehicleCard
                        image={"https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Hatchback.png"}
                        vehicleName="Uber Go"  
                        vehiclePrice="350"
                        arrivalMinutes="10"
                        message="Affordable, compact rides"
                    />
                    <VehicleCard
                        image={uberAuto}
                        vehicleName="Auto"  
                        vehiclePrice="89"
                        arrivalMinutes="5"
                        message="Affordable, auto rides"
                    />
                </div>
            </div>
     </div>
  )
}

export default Go