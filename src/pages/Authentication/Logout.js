import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout =()=>{
    const navigate = useNavigate();
    const logOut=()=>{
        localStorage.removeItem("auth");
        localStorage.removeItem("user");
        navigate("/");
    }
    useEffect(()=>{
     logOut();
    })
    return(
        <></>
    )
}

export default Logout;