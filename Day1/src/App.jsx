import React, { useState } from 'react'
import Navbar from './components/Navber'
import Cart from './components/Cart'
import { Routes } from 'react-router'
import { Route } from 'react-router'
import About from './pages/About'


export default function App() {

    const [items, setitems] = useState(
        [
            { id: 1, name: "Burger", count: 4 },
            { id: 2, name: "Fries", count: 3 },
            { id: 3, name: "Water", count: 2 }
        ]
    )

    const HandleReset = () => {
        const newitem = items.map(item => ({ ...item, count: 0 }))
        setitems(newitem)

    }

    // handle click function
    const HandleClickplus = (id) => {
        const netitem = items.map(item => ({ ...item, count: item.id === id ? item.count + 1 : item.count }))
        setitems(netitem)
    }


    // handle click function
    const HandleClicksub = (id) => {

        const netitem = items.map(item => ({ ...item, count: item.id === id && item.count > 0 ? item.count + -1 : item.count }))
        setitems(netitem)


    }

    // handle click function
    const HandleClickdel = (id) => {
        const netitem = items.filter(item => (item.id !== id))
        console.log(netitem)
        setitems(netitem)
    }


    return (
        <>
            <Navbar noOfItem={items.reduce((sum, itm) => itm.count + sum, 0)} />
            <Routes>

                <Route path='/' element={<Cart
                    items={items}
                    HandleClickplus={HandleClickplus}
                    HandleClicksub={HandleClicksub}
                    HandleClickdel={HandleClickdel}
                    HandleReset={HandleReset}

                />} />

                <Route path='/about' element={<About />} />
            </Routes >


        </>
    )
}
