import React, { useState, useEffect } from 'react'
import Navbar from './components/Navber'
import Cart from './components/Cart'
import { Routes } from 'react-router'
import { Route } from 'react-router'
import About from './pages/About'
import Aboutcompany from './pages/Aboutcompany'
import Aboutpeople from './pages/Aboutpeople'
import Error from './pages/Error'
import Product from './pages/Product'
import Productform from './pages/Productform'
import Home from './pages/Home'
import Menu from './pages/Menu'
import axios from 'axios'


export default function App() {

    let apiURL = "http://localhost:3000"
    const [items, setitems] = useState([])
    const [categories, setcategories] = useState([])
    const [loading, setloading] = useState(false)
    const [selected, setselected] = useState(0)
    const [currentpage, setcurrentpage] = useState(1)
    const [search, setsearch] = useState('');
    const pagesize = 4;

    useEffect(() => {
        setloading(true)
        // fetch("http://localhost:3000/menu?_delay=3000")
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setitems(data)
        //         setloading(false)
        //     })

        // axios.get("http://localhost:3000/menu?_delay=3000")
        //     .then(({ data }) => {
        //         setitems(data)
        //         setloading(false)
        //     })

        const getdata = async () => {
            let { data } = await axios.get(`${apiURL}/menu?_delay=2000`);
            let { data: categoriesdata } = await axios.get(`${apiURL}/category?_delay=2000`);
            setitems(data)
            setcategories([{ id: 0, name: "All" }, ...categoriesdata])
            setloading(false)

        }
        getdata()

    }, [])


    //Handle search
    const HandleSearch = (text) => {
        setsearch(text);
    };



    const HandleReset = () => {
        const newitem = items.map(item => ({ ...item, count: 0 }))
        setitems(newitem)

    }

    // Handle selected item
    const HandleSelected = (id) => {
        setselected(id)

    }

    // Handle filter items
    let filtered = selected == 0 ? items : items.filter(item => item.category == selected)

    if (search.trim() !== "") {
        filtered = filtered.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    //Handle Pagination
    const noOfPages = Math.ceil(filtered.length / pagesize)
    console.log(noOfPages)


    const start = (currentpage - 1) * pagesize
    const end = start + pagesize
    filtered = filtered.slice(start, end)



    //Handle Current Page
    const Handlecurrentpage = (page) => setcurrentpage(page)




    // handle click increament function
    const HandleClickplus = (id) => {
        const netitem = items.map(item => ({ ...item, count: item.id === id ? item.count + 1 : item.count }))
        setitems(netitem)
    }
    // handle Add to cart
    const HandleAddtocart = (id) => {
        const netitem = items.map(item => ({ ...item, isInCart: item.id == id ? !item.isInCart : item.isInCart }))
        setitems(netitem)
    }


    // handle click decrement function
    const HandleClicksub = (id) => {

        const netitem = items.map(item => ({ ...item, count: item.id === id && item.count > 0 ? item.count + -1 : item.count }))
        setitems(netitem)


    }

    // handle click delete function
    const HandleClickdel = (id) => {
        const netitem = items.filter(item => (item.id !== id))
        console.log(netitem)
        setitems(netitem)
    }


    return (
        <>
            <Navbar noOfItem={items.reduce((sum, itm) => itm.count + sum, 0)} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/menu' element={<Menu
                    items={filtered}
                    HandleAddtocart={HandleAddtocart}
                    loading={loading}
                    categories={categories}
                    selected={selected}
                    HandleSelected={HandleSelected}
                    noOfPages={noOfPages}
                    currentpage={currentpage}
                    Handlecurrentpage={Handlecurrentpage}
                    search={search}
                    HandleSearch={HandleSearch} />} />
                <Route path='/cart' element={<Cart
                    items={items.filter(item => item.isInCart)}
                    HandleClickplus={HandleClickplus}
                    HandleClicksub={HandleClicksub}
                    HandleClickdel={HandleClickdel}
                    HandleReset={HandleReset}


                />} />

                <Route path='/product/new' element={<Productform />} />
                <Route path='/product/:id/' element={<Product />} />
                <Route path='/about' element={<About />} >
                    <Route path='company' element={<Aboutcompany />} />
                    <Route path='people' element={<Aboutpeople />} />
                </Route>
                <Route path='*' element={< Error />} />

            </Routes >


        </>
    )
}
