import React, { isValidElement, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../style/nav.css";
import "../style/blog.css"
const Profile = () => {
   
    var url2 = "https://source.unsplash.com/random/employee"
    useEffect(() => {
        callAbout();
        callFollowers();
    }, []);
    const [show, setShow] = useState('none');
    const history = useHistory();
    const [userData, setUserData] = useState([{}]);
    const [my, setMy] = useState([]);

    const deleteBlog = async (id) => {
        try {
            const res = await fetch(`/delete/${id}`, {
                method: "DELETE",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            if (res.status === 200) {
                alert("Deleted Successfully !!!");
            }

        } catch (e) {
            console.log(e);
        }
    }

    const callAbout = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                    'x-access-token': localStorage.getItem('token'),
                },
                credentials: "include"
            });
            const data = await res.json();
            setUserData(data);
            console.log(data);
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
    const callFollowers = async () => {
        try {
            const res = await fetch('/aboutFollow', {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                    'x-access-token': localStorage.getItem('token'),
                },
                credentials: "include"
            });
            const data = await res.json();
            setMy(data.followers);
            console.log(data.followers);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (e) {
            console.log(e)
        }
    }

    const showFollowers = () => {
        setShow('block');
    }

    return (
        <>

            <table style={{ margin: "30px auto", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "25%" }}>
                <div style={{ padding: "15px 28px", display: "flex", justifyContent: "space-between"}}>
                    <h2>Following</h2>
                      <button onClick={() => showFollowers()} style={{ color: "white", fontSize: "18px", backgroundColor: "blue" }}>➕</button>
                </div>
                <hr />
                <tbody style={{ display: show }}>
                    {
                        my.map((v, i) => {
                            return (
                                <tr style={{ borderBottom: "1px solid grey", padding: "12px 18px", display: "flex", justifyContent: "space-between", }}>
                                    <td>{i + 1}</td>
                                    <td><Link to={`/About/${v}`} style={{ textDecoration: "none", fontSize: "18px" }}>Show Profile </Link></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            {
                userData.map((val, index) => {
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
                            <div className="operation">
                                <button className="btn"><Link to={`/Update/${val._id}`} style={{ color: "white", textDecoration: "none" }}>Update</Link></button>
                                <button className="btn"><Link to={`/Profile`} style={{ color: "white", textDecoration: "none" }} onClick={() => deleteBlog(val._id)}>Delete</Link></button>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
export default Profile;
