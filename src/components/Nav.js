import React, {  useEffect, useState } from "react";
import "../style/nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
    const RenderMenu = () => {
        const check=false;
const [state,setState]=useState(check);


        useEffect(()=>{
            const token=localStorage.getItem('token');
            if(token){
                setState(!check);
            }
        },[state]);
        if (state) {
            return (
                <>
                    <Link to="/"><a href="">Home</a></Link>
                    <Link to="/Blog/:category"><a href="">Blogs</a></Link>
                    <Link to="/Blog/Technology"><a href="">Technology</a></Link>
                    <Link to="/Blog/Political"><a href="">Politics</a></Link>
                    <Link to="/Blog/Entertainement"><a href="">Entertainement</a></Link>
                    <Link to="/Blog/Others"><a href="">Others</a></Link>
                    <Link to="/Update/:_id"><a href="">updateBlog</a></Link>
                    <Link to="/Profile"><a href="">Profile</a></Link>
                    <Link to="/Create"><a href="">Create</a></Link>
                    <Link to="/Logout"><a href="">Logout</a></Link>
                </>
            )
        }
        else {
            return (
                <>
                    <Link to="/"><a href="">Home</a></Link>
                    <Link to="/Blog/:category"><a href="">Blogs</a></Link>
                    <Link to="/Blog/Technology"><a href="">Technology</a></Link>
                    <Link to="/Blog/Political"><a href="">Politics</a></Link>
                    <Link to="/Blog/Entertainement"><a href="">Entertainement</a></Link>
                    <Link to="/Blog/Others"><a href="">Others</a></Link>
                    <Link to="/Signup"><a href="">Signup</a></Link>
                </>
            )
        }

    }
    return (
        <>
            <div className="nav">
                <RenderMenu />
            </div>
        </>
    )
}
export default Nav;