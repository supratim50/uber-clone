import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';

const Home = () => {

  const navigate = useNavigate();
  const [pickupSuggestion, setPickupSuggestion] = useState(false);
  const [destinationSuggestion, setDestinationSuggestion] = useState(false);

  const {userData, setuserData} = useContext(UserDataContext);

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

  useEffect(() => {
    console.log(userData)
  }, [userData])

  return (
    <div className='w-full h-screen py-3 px-4'>
      <nav className='flex justify-between items-center'>
        <h2 className='text-xl font-semibold'>Uber</h2>
        <div className='flex items-center gap-2'>
          <p className='py-2 px-4 bg-[#eeeeee] rounded-full'>{userData?.fullname?.firstname}</p>

          <button 
            onClick={handleLogout}
            className='py-2 px-4 bg-black rounded-lg text-white'>Logout</button>
        </div>
      </nav>

      <section className='my-8'>
        <h1 className='text-[35px] font-bold leading-10 mb-4'>Go anywhere with Uber</h1>
        <p className='text-lg mb-3'>Request a ride, hop in, and go.</p>

        <div className='mb-6'>
          <div className='relative'>
            <input 
              type="text"
              onFocus={() => setPickupSuggestion(true)} 
              onBlur={() => setPickupSuggestion(false)}
              placeholder='Enter location' 
              className='px-4 py-2 text-base bg-[#eeeeee] w-full mb-2 rounded-lg'
            />
            <div className={`px-4 py-2 rounded-lg bg-white shadow-md absolute top-[100%] w-full min-h-[50px] transition ${!pickupSuggestion ? 'hidden' : ''} z-10`}>
              <p className='text-gray-500 text-center'>No Result</p>
            </div>
          </div>
          <div className='relative'>
            <input 
              type="text" 
              onFocus={() => setDestinationSuggestion(true)} 
              onBlur={() => setDestinationSuggestion(false)}
              placeholder='Enter destination' 
              className='px-4 py-2 text-base bg-[#eeeeee] w-full rounded-lg'
            />
            <div className={`py-4 rounded-lg bg-white shadow-md absolute top-[100%] w-full min-h-[50px] transition ${!destinationSuggestion ? 'hidden' : ''}`}>
                {/* <p className='text-gray-500 text-center'>No Result</p> */}

                <div className='w-full px-3 py-2 hover:bg-gray-200'>
                    <p>Loocation</p>
                </div>
                <div className='w-full px-3 py-2 hover:bg-gray-200'>
                    <p>Loocation</p>
                </div>
            </div>
          </div>
        </div>

        <Link to={"/go"} className='bg-black rounded-lg text-white py-2 px-6'>See Prices</Link>

      </section>
    </div>
  )
}

export default Home