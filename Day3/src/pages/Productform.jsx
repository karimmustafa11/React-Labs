import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Productform() {
    const navigte = useNavigate()

    const Handlesubmit = () => {

        navigte("/")
    }
    return (
        <div>
            <h1>Add new producr</h1>

            <input type="text" name="" id="" placeholder='name' />
            <input type="text" name="" id="" placeholder='Email' />
            <button className="btn" onClick={Handlesubmit}> Submit</button>
        </div>
    )
}
