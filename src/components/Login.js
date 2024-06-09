import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import loginImage from "../images/login.jpg";
import "../style/login.css";
import "../style/nav.css";

const Login = () => {

    const history = useHistory();
    const [name, setName] = useState({
        email: "",
        password: ""
    });

    const inputEvent = (event) => {
        //        const value=event.target.value;
        //        const name=event.target.name;
        const { value, name } = event.target;
        setName((pre) => {
            console.log(pre);
            return {
                ...pre,
                [name]: value,
            };
        });
    };

    const sendEvent = async (e) => {
        e.preventDefault();
        const { email, password } = name;
        const res = await fetch('/login', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        console.log(res);

        const data = await res.json();
        console.log(data);
        if (res.status === 200) {
            console.log(data);
            if(data.loggedin){
                localStorage.setItem("token",data.loggedin);
                alert(`Welcome ${data.data.author}`);
                history.push('/Create');
            }
        }
        else {
           alert("Failed Login");
        }
    }

    return (
        <>
            <div className="my-body">
                <img src={loginImage} alt="image"/>
                <form style={{overflow:"hidden"}}>
                    <h3>Login Here</h3>
                    <label for="username">Username</label>
                    <input type="text" placeholder="Email or Username" id="username" onChange={inputEvent} name="email" value={name.email}/>

                    <label for="password">Password</label>
                    <input type="password" placeholder="Password" id="password" onChange={inputEvent} name="password" value={name.password}/>
                    <button className="button" onClick={sendEvent}>Log In</button>
                    <button className="button"><Link to="/Signup">Sign Up</Link></button>
                </form>
            </div>

        </>
    );
};
export default Login;