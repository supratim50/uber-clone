import React from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <h3 className='mb-10 text-[24px] font-semibold'>Uber</h3>
        <form action="">
          <div className='mb-4'>
            <h3 className='text-lg font-medium mb-2'>What's your emial</h3>
            <input 
              className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              required 
              type="email" 
              placeholder='email@example.com' />
          </div>
          <div className='mb-4'>
            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            <input 
              className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              required 
              type="password" 
              placeholder='password' />
          </div>
          <p className='text-center mb-3'>New Here? <Link to={"/user/signup"} className='text-blue-600'>Create Account</Link></p>
          <button className='bg-black text-white rounded px-4 py-2 border w-full text-lg mt-4'>Login</button>
        </form>
      </div>
      <div>
        <Link to={"/captain/login"} className="w-full bg-[#44a728] text-white rounded px-4 py-2 borde text-lg mt-4 flex justify-center items-center">Signin as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin