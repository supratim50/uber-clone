import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import InputWithLabel from '../components/Inputs/InputWithLabel';
import axios from "axios";
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const {captainData, setCaptainData} = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const loginDetails = {email, password};

    setIsLoading(true);

    let response;

    try {
      response = await axios.post(`${import.meta.env.VITE_DEV_BASE_URL}/captains/login`, loginDetails);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("ERROR: ", error.response.data.message);
    }

    const data = response.data;

    if(response.status === 200) {
      setCaptainData(data.captain);
      localStorage.setItem("captainToken", data.token);
      navigate("/captain/home");
    }

    setEmail("");
    setPassword("");
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <h3 className='mb-10 text-[24px] font-semibold'>Uber Captain</h3>
        <form onSubmit={e => submitHandler(e)}>
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
          <button className='bg-black text-white rounded px-4 py-2 border w-full text-lg mt-4'>
            {
              isLoading ? "Loading..." : "Login"
            }
          </button>
        </form>
      </div>
      <div>
        <Link to={"/user/login"} className="w-full bg-[#d57a24] text-white rounded px-4 py-2 borde text-lg mt-4 flex justify-center items-center font-semibold">Signin as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin