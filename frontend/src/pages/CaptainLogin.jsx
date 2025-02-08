import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import InputWithLabel from '../components/Inputs/InputWithLabel';

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submithandler = (e) => {
    e.preventDefault();
    setCaptainData({email, password});

    console.log(captainData);

    setEmail("");
    setPassword("");
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <h3 className='mb-10 text-[24px] font-semibold'>Uber Captain</h3>
        <form onSubmit={e => submithandler(e)}>
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
          <p className='text-center mb-3'>Join a fleet? <Link to={"/captain/signup"} className='text-blue-600'>Register as Captain</Link></p>
          <button className='bg-black text-white rounded px-4 py-2 border w-full text-lg mt-4'>Login</button>
        </form>
      </div>
      <div>
        <Link to={"/user/login"} className="w-full bg-[#d57a24] text-white rounded px-4 py-2 borde text-lg mt-4 flex justify-center items-center font-semibold">Signin as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin