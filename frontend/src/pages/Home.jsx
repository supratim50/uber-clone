import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("userToken");
    
    const response = await axios.get(`${import.meta.env.VITE_DEV_BASE_URL}/user/logout`, {
      headers: {
        Authorization: `bearer ${token}`
      }
    });

    if(response.status === 200) {
      localStorage.removeItem("userToken");
      navigate("/user/login");
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

export default Home