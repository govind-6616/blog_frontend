import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../style/nav.css";
import "../style/blog.css";
const Check = () => {
    useEffect(() => {
        getData();
    }, []);
    const [detail, setDetail] = useState({
        date: "", heading: "", category: "", article: "", url: "", _id: "", author: ""
    });

    const { _id } = useParams();
    console.log(_id);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setDetail({ ...detail, [name]: value });
        console.log(detail);
    }

    const getData = async () => {
        try {
            const res = await axios.get(`/blogDetail/${_id}`);
            if (res.status === 200) {
                // const data = await res.json();
                setDetail(res.data);
                console.log(res.data);
            }
        }
        catch (err) {
            // history.push('/Login');
            console.log(err);
        }
    }

    const updateBlog = async () => {
        try {
            // const { heading, category, article, url, author } = detail;
            const res = await axios.patch(`/updateBlog/${_id}`, detail);

            if (res.status === 200) {
                alert("Blog Updated successfully");
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div style={{ margin: "5% auto" }}>
                <div style={{ padding: "5% 25%" }} className="upload-blog">
                    <input type="text" placeholder="Heading" onChange={handleChange} name="heading" value={detail.heading} />
                    <input type="text" placeholder="Image url" onChange={handleChange} name="url" value={detail.url} />
                    <select style={{ width: "100%", padding: "18px 6px", margin: "7px 0px", fontSize: "17px", outline: "none" }} name="category" value={detail.category} onChange={handleChange}>
                        <option selected >Select Category from given below ...</option>
                        <option>Entertainement</option>
                        <option>Technology</option>
                        <option>Political</option>
                        <option>Others</option>
                    </select>
                    <textarea style={{ display: "block", width: "100%", height: "380px", padding: "2%", outline: "none", fontSize: "17px" }} placeholder="Write Article in 80-100 words" onChange={handleChange} name="article" value={detail.article} />
                    <input type="text" placeholder="DD:MM:YYYY" onChange={handleChange} name="date" value={detail.date} />
                    <input type="text" placeholder="Author Name" value={detail.author} name="author" disabled={true} />
                    <button className="btn" style={{ display: "block" }} onClick={() => updateBlog()}>Update</button>
                </div>
            </div>

        </>
    )

}
export default Check;