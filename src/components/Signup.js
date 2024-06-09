import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SignupImage from "../images/signup.jpg";

const Signup = () => {
    const history = useHistory();
    const [nam, setNam] = useState({
        author: "", email: "", password: "", city: "", mobile: "", jobprofile: ""
    });
    const inputEvent = (event) => {
        //  const value=event.target.value;
        //     const name=event.target.name;
        const { value, name } = event.target;
        setNam((pre) => {
            console.log(pre);
            return {
                ...pre,
                [name]: value,
            };
        });
        // setNam({...nam,[name]:value});
    };
    const PostData = async (e) => {
        e.preventDefault();
        const { author, email, password, city, mobile, jobprofile } = nam;
        const res = await fetch('/register', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                author, email, password, city, mobile, jobprofile,
            })
        });
        console.log(res);

        const data = await res.json();
        console.log(data);
        if (res.status === 200) {
            alert("Successful Register ");
            history.push('/Login');
        }
        else if(res.status===422) {
          alert("User Already Exist");
        }
        else{
            alert("Failed Login");
        }

    }
    return (
        <>

            <div className="my-body">
                <img src={SignupImage} alt="images" />
                <form>
                    <h3>Register Here</h3>
                    <label>Username</label>
                    <input type="email" onChange={inputEvent} placeholder="Email or Username" name="email" value={nam.email} />

                    <label for="password">Password</label>
                    <input type="password" onChange={inputEvent} placeholder="Password" name="password" value={nam.password} />

                    <label>Name</label>
                    <input type="text" onChange={inputEvent} placeholder="Name" name="author" value={nam.name} />

                    <label>City</label>
                    <input type="text" onChange={inputEvent} placeholder="City" name="city" value={nam.city} />

                    <label>Mobile</label>
                    <input type="text" onChange={inputEvent} placeholder="Mobile" name="mobile" value={nam.mobile} />

                    <label>Profession</label>
                    <input type="text" onChange={inputEvent} placeholder="profile" name="jobprofile" value={nam.jobprofile} />

                    <button className="button" onClick={PostData}>Register</button>
                    <button className="button"><Link to="">Log In</Link></button>
                </form>
            </div>

        </>
    );
};
export default Signup;
