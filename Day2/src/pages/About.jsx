import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function About() {
    return (
        <>
            <div>
                <h1 className=''>Hello from about page</h1>
            </div>


            <ul className='flex flex-row gap-1 '>
                <li>
                    <Link to="/about/company" className='bg-amber-500 p-1.5 block'>Company</Link>
                </li>

                <li>
                    <Link to="/about/people" className='bg-amber-300 p-1.5 block'>People</Link>
                </li>
            </ul>
            <Outlet />
        </>
    )
}
