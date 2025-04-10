import React, { createContext } from 'react'


export const username = createContext(null)


export default function UserContext({ children }) {
    const value = "karim"
    return (
        <username.Provider value={value} >
            {children}
        </username.Provider >

    )
}
