import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainHome = () => {

  const navigate = useNavigate();
  
  const handleLogout = async () => {

    const token = localStorage.getItem("captainToken");

    const response = await axios.get(`${import.meta.env.VITE_DEV_BASE_URL}/captains/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if(response.status === 200) {
      localStorage.removeItem("captainToken");
      navigate("/captain/login");
    }
  }

  return (
    <div className='w-full h-screen flex justify-center items-center text-black'>
      <button 
        className='py-2 px-4 rounded bg-black text-white font-semibold'
        onClick={handleLogout}
      >Logout</button>
    </div>
  )
}

export default CaptainHome