import React, { useState, useEffect } from 'react'
import Menu from './Menu'
import Cart from '../components/Cart'


export default function Home() {
    const [count1, setcount1] = useState(0)
    const [count2, setcount2] = useState(0)

    const Handleplus1 = () => {
        setcount1(count1 + 1)
    }
    const Handleplus2 = () => {
        setcount2(count2 + 1)
    }

    // useEffect(() => {
    //     console.log("effect")

    //     return () => {
    //         console.log("clean")
    //     }
    // },)
    // console.log("render")


    return (
        <>
            <div>
                <h1>Hello from home page</h1>
            </div>
        </>
    )
}
