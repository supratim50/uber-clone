import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    
        <div className='bg-cover bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhZmZpYyUyMGxpZ2h0JTIwdWJlciUyMGhvbWUlMjBwYWdlfGVufDB8fDB8fHww)] bg-red-400 w-full h-screen flex justify-between flex-col max-w-[456px]'>
            <h3 className='py-6 px-4 text-[24px] font-semibold '>Uber</h3>
            <div className='bg-white p-4'>
                <h2 className='text-xl text-black font-bold'>Getting strted with Uber</h2>
                <Link to={"/user/login"} className='w-full bg-black text-white px-4 py-3 flex justify-center items-center mt-3 rounded'>Continue</Link>
            </div>
        </div>
  )
}

export default Home