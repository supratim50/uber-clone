import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';

const UserrProtectedWrapper = ({children}) => {
    const navigate = useNavigate();
    const {userData, setUserData} = useContext(UserDataContext);

    const [checking, setChecking] = useState(true);

    const verifyToken = async (token) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_DEV_BASE_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(response.status === 200) {
                console.log(response.data)
                setUserData(response.data);
                setChecking(false);
            }
        } catch (error) {
            console.log(error.response.data.message)
            setChecking(false);
            navigate("/user/login")
        }
    }

    useEffect(() => {
        setChecking(true);
        const token = localStorage.getItem("userToken");
        
        if(token === null) {
            setChecking(false);
            navigate("/user/login");
        }

        verifyToken(token);
    }, [navigate])

    if(checking) {
        return (
            <div className='w-full h-screen flex justify-center items-center text-black'>
                Checking...
            </div>
        )
    } else {
        return (
            <div>{children}</div>
        )
    }
        
    
}

export default UserrProtectedWrapper