import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { use } from 'react'
import UseFetchItem from './hooks/UseFetchItem'

export default function Posts() {

    const { post, HandleChange, searchinput } = UseFetchItem("users")



    return (

        <>
            <input
                type="text"
                onChange={HandleChange}
                placeholder='Search for post...'
                className='p-3 border-2 rounded-2xl m-3'
            />

            <div>
                {post &&
                    <div className='mt-10 w-7xl ms-4 border-2 p-3'>
                        <h1 className='font-bold'>{post.name}</h1 >
                        <p>{post.body}</p>
                    </div>}
            </div>

        </>

    )
}
