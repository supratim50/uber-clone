import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const UserrProtectedWrapper = ({children}) => {
    const navigate = useNavigate();

    const [checking, setChecking] = useState(true);

    useEffect(() => {
        setChecking(true);
        const token = localStorage.getItem("userToken");
        console.log("TOKEN", token)
        if(token === null) {
            setChecking(false);
            navigate("/user/login");
        }
        setChecking(false);
    }, [navigate])

    if(checking) {
        return (
            <div className='w-full h-screen felx justify-center items-center text-black'>
                Checking...
            </div>
        )
    } 
        
    return (
        <div>{children}</div>
    )
}

export default UserrProtectedWrapper