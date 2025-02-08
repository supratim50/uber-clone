import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputWithLabel from '../components/Inputs/InputWithLabel';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const {userData, setUserData} = useContext(UserDataContext);
  const navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();

    const loginData = {
      email, password
    }
    
    const response = await axios.post(`${import.meta.env.VITE_DEV_BASE_URL}/user/login`, loginData);

    console.log("LOGIN RESPONSE",response);
    const data = response.data;

    if(response.status === 200) {
      setUserData(data.user);
      navigate("/home");
      localStorage.setItem('userToken', data.token);
    }

    setEmail("");
    setPassword("");
  }

  useEffect(() => {
    console.log(userData);
  }, [userData])

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <h3 className='mb-10 text-[24px] font-semibold'>Uber</h3>
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
          <p className='text-center mb-3'>New Here? <Link to={"/user/signup"} className='text-blue-600'>Create Account</Link></p>
          <button className='bg-black text-white rounded px-4 py-2 border w-full text-lg mt-4'>Login</button>
        </form>
      </div>
      <div>
        <Link to={"/captain/login"} className="w-full bg-[#44a728] text-white rounded px-4 py-2 borde text-lg mt-4 flex justify-center items-center font-semibold">Signin as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin