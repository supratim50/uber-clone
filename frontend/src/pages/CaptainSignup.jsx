import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import InputWithLabel from '../components/Inputs/InputWithLabel';

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState({firstname: '', lastname: ''});
  const [userData, setUserData] = useState({});
  
  const submithandler = (e) => {
    e.preventDefault();
    setUserData({email, password, fullname});

  
    setEmail("");
    setPassword("");
    setFullname({firstname: '', lastname: ''})
  }

  const handleChangeForFullName = (e) => {
    const {name, value} = e.target;

    setFullname((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    console.log(userData);
  }, [userData])


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

          <p className='text-center mb-3'>Already have an account? <Link to={"/captain/login"} className='text-blue-600'>Login</Link></p>
          <button className='bg-black text-white rounded px-4 py-2 border w-full text-lg mt-4'>Register as a Captain</button>
        </form>
      </div>
    </div>
  )
}

export default CaptainSignup