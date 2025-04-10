import React from 'react'
import { username } from '../context/UserContext'
import { useContext } from 'react'
export default function Child() {
    const user = useContext(username)
    return (
        <div>
            <h1>Hello from child: {user}</h1>
        </div>
    )
}
