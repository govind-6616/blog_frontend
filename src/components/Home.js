import React, { useEffect, useState } from "react";
import { useHistory, useParams,Link } from "react-router-dom";
import "../style/blog.css"
// import "../style/nav.css";

const Home = () => {
    const history = useHistory();

    var url2="https://source.unsplash.com/random/employee"
    const [data, setData] = useState([{}]);
    const { category } = useParams();


    useEffect(() => {
        getCategory();
    }, [category]);

    useEffect(() => {
        getBlog();
    }, []);

    const getBlog = async () => {
        try {
            const res = await fetch(`/getData`, {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();
            setData(data);
        }
        catch (e) {
            console.log(e);
        }
    }
    const getCategory = async () => {
        try {
            const res = await fetch(`/${category}`, {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();
            setData(data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
         <div className="parent">
            {
                data.sort(() => Math.random() - 0.5).map((val, index) => {
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
                            <Link to={`/Blog/${val.category}/${val._id}`} className="read-more"><a href="" style={{textDecoration:"none"}}>Read More</a></Link>
                            <div className="blog-footer">
                                <div className="blog-author"><img src={url2} alt="images"/><p>{val.author}</p></div>
                                <div className="blog-date"><p><b>{val.date}</b></p></div>
                            </div>
                            </div>
                       
                    )
                })
            }
             </div>
        </>
    )
}
export default Home;
