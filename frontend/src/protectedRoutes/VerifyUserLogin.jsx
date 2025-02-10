import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const VerifyUserLogin = ({children}) => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("userToken");

        if(token) {
            navigate("/home");
        }
    }, [])

    return  (
        <div>{children}</div>
    )
}

export default VerifyUserLogin