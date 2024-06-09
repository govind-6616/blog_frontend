import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../style/blog.css";
import "../style/nav.css";
const Contact = () => {
    const history = useHistory();
useEffect(()=>{
    const token=localStorage.getItem('token');
    if(!token){
history.push('/login');
    }
},[]);
useEffect(()=>{
    callDetail();
setDate();
},[]);
const setDate=()=>{
    const date=new Date().toDateString();
    setBlog({date:date});
}
    const [blog, setBlog] = useState([{
        date:"", heading: "", category: "", article: "", url: "",_id:"",author:""
    }]);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setBlog({ ...blog, [name]: value });
        console.log(blog.article);
    }

    const callDetail = async () => {
        try {
            const res = await fetch('/getUser', {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                    'x-access-token': localStorage.getItem('token'),
                },
                credentials: "include"
            });
            const data = await res.json();
            if(res.status===200){
            setBlog(data);
            }
        }
        catch (err) {
            // history.push('/login');
            console.log(err);
        }
    }

    const uploadBlog = async () => {

        try {
            const { heading, category, article, url,author,_id } = blog;
            const res = await fetch(`/uploadBlog`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    heading, category, article, url,author,_id
                })
            })
            if(res.status===200){
                alert("Blog Upload Successfully");
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <>
        <div style={{margin:"5% auto"}}>
            <div style={{padding:"5% 25%"}} className="upload-blog">
                <input type="text" placeholder="Heading" onChange={handleChange} name="heading" value={blog.heading}/>
                <input type="text" placeholder="Image url" onChange={handleChange} name="url" value={blog.url}/>
                <select style={{width:"100%",padding:"18px 6px",margin:"7px 0px",fontSize:"17px",outline:"none"}} name="category" value={blog.category} onChange={handleChange}>
                    <option selected >Select Category from given below ...</option>
                    <option>Entertainement</option>
                    <option>Technology</option>
                    <option>Political</option>
                    <option>Others</option>
                </select>
                <textarea style={{display:"block",width:"100%",height:"380px",padding:"2%",outline:"none",fontSize:"17px"}} placeholder="Write Article in 80-100 words" onChange={handleChange} name="article" value={blog.article}/>
                <input type="text" placeholder="DD:MM:YYYY"  name="date" value={blog.date} readOnly={true}/>
                <input type="text" placeholder="Author Name" value={blog.author} name="author" readOnly={true}/>
            <button className="btn" style={{ display: "block" }} onClick={() => uploadBlog()}>Upload</button>
            </div>
        </div>
        </>
    )
}
export default Contact;