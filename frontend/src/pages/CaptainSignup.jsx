import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import InputWithLabel from '../components/Inputs/InputWithLabel';
import axios from "axios";
import {CaptainDataContext} from '../context/CaptainContext';

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState({firstname: '', lastname: ''});
  const [vehicleDetails, setVehicleDetails] = useState({
    color: '', plate: '', capacity: 0, vehicleType: 'car'
  })

  const navigate = useNavigate();
  
  const {captainData, setCaptainData} = useContext(CaptainDataContext);
  
  const submithandler = async (e) => {
    e.preventDefault();

    const newCaptain = {
      fullname, email, password, vehicle: vehicleDetails
    }

    const response = await axios.post(`${import.meta.env.VITE_DEV_BASE_URL}/captains/register`, newCaptain);

    const data = response.data;
    if(response.status === 201) {
      const captain = data.captain;

      setCaptainData(captain);
      localStorage.setItem('captainToken', data.token);
      navigate("/captain/home");
    }

  
    setEmail("");
    setPassword("");
    setFullname({firstname: '', lastname: ''});
    setVehicleDetails({
      color: '', plate: '', capacity: 0, vehicleType: 'car'
    })
  }

  const handleChangeForFullName = (e) => {
    const {name, value} = e.target;

    setFullname((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handlerForVehicleDetails = (e) => {
    const {name, value} = e.target;

    setVehicleDetails((prev) => ({...prev, [name]:value}));
  }

  useEffect(() => {
    const newCaptain = {
    fullname, email, password, vehicle: vehicleDetails
  }
  console.log(newCaptain)
  }, [vehicleDetails])


  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <h3 className='mb-10 text-[24px] font-semibold'>Uber Captain</h3>
        <form onSubmit={e => submithandler(e)}>
          
          <div className='mb-4'>
            <h3 className='text-md font-medium mb-2'>Enter Full Name</h3>
            <div className='flex gap-4'>
              <input 
                className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-md placeholder:text-base'
                required 
                name='firstname'
                value={fullname.firstname}
                onChange={handleChangeForFullName}
                type="text" 
                placeholder='Firstname' />
                
              <input 
                className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-md placeholder:text-base'
                required 
                name='lastname'
                value={fullname.lastname}
                onChange={handleChangeForFullName}
                type="text" 
                placeholder='Lastname' />
            </div>
          </div>

          <InputWithLabel 
            label={"What's your email"} 
            onChange={setEmail}
            value={email}
            type="email"
            placeholder="email"
            required
          />
          <InputWithLabel 
            label={"Enter Password"} 
            onChange={setPassword}
            value={password}
            type="password"
            placeholder="password"
            required
          />

          <div className='mb-4'>
            <h3 className='text-md font-medium mb-2'>Vehicle Information</h3>
            <div className='mb-4 flex gap-4'>
              <input 
                className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-md placeholder:text-base'
                required 
                name='color'
                value={vehicleDetails.color}
                onChange={handlerForVehicleDetails}
                type="text" 
                placeholder='Vehicle Colour' />
                
              <input 
                className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-md placeholder:text-base'
                required 
                name='plate'
                value={vehicleDetails.plate}
                onChange={handlerForVehicleDetails}
                type="text" 
                placeholder='Vehicle Plate' />
            </div>
            <div className='flex gap-4'>
              <input 
                className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-md placeholder:text-base'
                required 
                name='capacity'
                value={vehicleDetails.capacity}
                onChange={handlerForVehicleDetails}
                type="text" 
                placeholder='Vehicle Capacity' />
                
              <select 
                name="vehicleType"
                className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-md placeholder:text-base'
                onChange={handlerForVehicleDetails}
              >
                <option value="car" defaultChecked>Car</option>
                <option value="moto">Moto</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>

          <p className='text-center mb-3'>Already have an account? <Link to={"/captain/login"} className='text-blue-600'>Login</Link></p>
          <button className='bg-black text-white rounded px-4 py-2 border w-full text-lg mt-4'>Register as a Captain</button>
        </form>
      </div>
    </div>
  )
}

export default CaptainSignup