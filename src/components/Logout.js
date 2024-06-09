import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

const Logout = () => {
    const history = useHistory();
    useEffect(() => {
        const token = localStorage.removeItem('token');
        if (token) {
            localStorage.clear();
            history.push('/login');
        }
        history.push('/login');
    }, []);
    //     useEffect(()=>{
    // fetch('/logout',{
    //     method:"GET",
    //     headers:{
    //         accept:"application/json",
    //         "Content-Type":"application/json"
    //     },
    //     credentials:"include"
    // }).then((res)=>{
    //     history.push('/Login'); 
    // if(!res.status===200){
    //     const error=new Error(res.error);
    //     throw error;
    // }
    // })

    //     });
    return (
        <>
            <h1>User Logout</h1>
        </>
    )
}
export default Logout;