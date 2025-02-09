import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from './context/CaptainContext';
import axios from 'axios';

const CaptainProtectedWrapper = ({children}) => {

  const [checking, setChecking] = useState(false);

  const {captainData, setCaptainData} = useContext(CaptainDataContext);

  const navigate = useNavigate();

  const verifyToken = async (token) => {
      try {
          const response = await axios.get(`${import.meta.env.VITE_DEV_BASE_URL}/captains/profile`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });

          console.log("RESPONSE ", response);

          if(response.status === 200) {
            setCaptainData(response.data.captain);
              setChecking(false);
          }
      } catch (error) {
          console.log(error.response?.data.message)
          setChecking(false);
          navigate("/captain/login");
      }
  }


  useEffect(() => {
    setChecking(true);
    const token = localStorage.getItem("captainToken");
    
    if(!token) {
      setChecking(false);
      navigate("/captain/login");
    }

    verifyToken(token);
  }, [navigate]);

  if(checking) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        Checking...
      </div>
    )
  } else {
    return (
      <div>{children}</div>
    )
  }

  
}

export default CaptainProtectedWrapper