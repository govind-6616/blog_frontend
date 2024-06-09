import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import "../style/blog.css"

const Read = () => {

    const [blog, setBlog] = useState({});

    const { _id } = useParams();

    useEffect(() => {
        getBlog();
    }, [_id]);

 
    var url2 = "https://source.unsplash.com/random/employee"

    const getBlog = async () => {
        try {
            const res = await fetch(`/getData/${_id}`, {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();
            setBlog(data);
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className="blog-main">
                <div className="blog-img">
                    <img src={blog.url} alt="images" />
                </div>
                <div className="blog-data" style={{ height: "480px", overflowY: "scroll" }}>
                    <h2>{blog.category}</h2>
                    <h1>{blog.heading}</h1>
                    <p>{blog.article}</p>
                </div>
                <div className="blog-footer">
                    <div className="blog-author"><img src={url2} alt="images"/><Link to={`/About/${blog.author_id}`}>{blog.author}</Link></div>
                    <div className="blog-date"><pre><b>{blog.date}</b></pre></div>
                </div>
                <div className="like-section">
{/* <p onClick={()=>likeThis()}>👍🏻</p> */}
                </div>
            </div>
        </>
    )
}
export default Read;
