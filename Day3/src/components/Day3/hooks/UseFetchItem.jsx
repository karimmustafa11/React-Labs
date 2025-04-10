import React, { useEffect, useState } from 'react'
import axios from 'axios';


export default function UseFetchItem(url) {
    // const [posts, setposts] = useState([])
    // const [searchinput, setsearchinput] = useState("")

    // useEffect(() => {

    //     const getdata = async () => {
    //         const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts")
    //         setposts(data)
    //     }

    //     getdata()

    // }, [])

    const [post, setpost] = useState(null)
    const [searchinput, setsearchinput] = useState("")

    useEffect(() => {
        const getdata = async () => {
            if (searchinput) {
                try {
                    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/${url}/${searchinput}`);
                    setpost(data);
                } catch (error) {
                    console.error("Error fetching post:", error);
                    setpost(null);
                }
            } else {
                setpost(null);
            }
        };

        getdata();
    }, [searchinput]);



    //handle search
    const HandleChange = (e) => setsearchinput(e.target.value)

    //Handle posts
    // const FilteredPosts = searchinput
    //     ? posts.filter((p) => p.title.includes(searchinput))
    //     : posts;

    return {
        post,
        HandleChange,
        searchinput
    }
}
