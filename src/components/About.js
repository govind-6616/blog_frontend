import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Profile from "./profile";
import "../style/nav.css";
import "../style/blog.css"
const About = () => {

    var url2 = "https://source.unsplash.com/random/employee"

    const history = useHistory();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please Login");
            history.push('/');
        }
        callAbout();
        callBlog();
    }, []);

    const [my, setMy] = useState([]);
    const [userData, setUserData] = useState({});
    const [blog, setBlog] = useState([{}]);
    var number = blog.length;

    const { _id } = useParams();

    const callAbout = async () => {
        try {
            const res = await fetch(`/About/${_id}`, {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            const data = await res.json();
            setUserData(data);
            setMy(data.followers);
            console.log(data.followers);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        }
        catch (err) {
            history.push('/Login');
            console.log(err);
        }
    }

    const callBlog = async () => {
        try {
            const res = await fetch(`/blog/${_id}`, {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            const data = await res.json();
            setBlog(data);
            console.log(data);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const followBloger = async () => {
        try {
            const res = await fetch(`/follow/${_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'x-access-token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    _id
                })
            });
            if (res.status === 200) {
                alert("Followed Successfully");
            }
            else {
                const error = new Error(res.error);
                throw error;
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {
                <div className="about-main-div">

                    <img src={url2} alt="" />
                    <hr style={{ width: "70%", height: "5px", backgroundColor: "blue", margin: "20px auto" }} />

                    <table id="profile-table">
                        <tbody>
                            <tr className="profile-row">
                                <td>Name</td>
                                <td>{userData.author}</td>
                            </tr>
                            <tr className="profile-row">
                                <td>Username</td>
                                <td>{userData.email}</td>
                            </tr>
                            <tr className="profile-row">
                                <td>Profession</td>
                                <td>{userData.jobprofile}</td>
                            </tr>
                            <tr className="profile-row">
                                <td>City</td>
                                <td>{userData.city}</td>
                            </tr>
                            <tr className="profile-row">
                                <td>Number Of Blogs</td>
                                <td>{number}</td>
                            </tr>
                            <tr className="profile-row">
                                <td>E-mail</td>
                                <td>{userData.email}</td>
                            </tr>
                            <tr className="profile-row">
                                <td>No of Following</td>
                                <td>{my.length}</td>
                            </tr>
                        </tbody>
                    </table>

                    <button className="btn" style={{ margin: "60px auto", width: "20%" }} onClick={() => followBloger()}>Follow</button>
                </div>
            }
            {/* 
{
    my.map((v,i)=>{
        return(
            <div key={i}>
                <a href="">{v}</a>
            </div>
        )
    })
} */}

            {
                blog.map((val, index) => {
                    return (
                        <div key={index} className="blog-main">
                            <div className="blog-img">
                                <img src={val.url} alt="images" />
                            </div>
                            <div className="blog-data">
                                <h2>{val.category}</h2>
                                <h1>{val.heading}</h1>
                                <p>{val.article}</p>
                            </div>
                            <Link to={`/Blog/${val.category}/${val._id}`} className="read-more"><a href="" style={{ textDecoration: "none" }}>Read More</a></Link>
                            <div className="blog-footer">
                                <div className="blog-author"><img src={url2} alt="images" /><p>{val.author}</p></div>
                                <div className="blog-date"><p><b>{val.date}</b></p></div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
export default About;
