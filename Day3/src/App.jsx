import React, { useState, useEffect } from 'react';
import Navbar from './components/Navber';
import Cart from './components/Cart';
import { Routes, Route } from 'react-router';
import About from './pages/About';
import Aboutcompany from './pages/Aboutcompany';
import Aboutpeople from './pages/Aboutpeople';
import Error from './pages/Error';
import Product from './pages/Product';
import AddProduct from './components/Day3/AddProduct';
import EditProduct from './components/Day3/EditProduct';
import Home from './pages/Home';
import Menu from './pages/Menu';
import axios from 'axios';
import Parent from './components/Day3/parent';
import Posts from './components/Day3/Posts';
import Admin from './components/Day3/Admin';

export default function App() {
    const apiURL = "http://localhost:3000";
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const pageSize = 4;

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const [itemsResponse, categoriesResponse] = await Promise.all([
                    axios.get(`${apiURL}/menu?_delay=1000`),
                    axios.get(`${apiURL}/category?_delay=1000`),
                ]);
                setItems(itemsResponse.data);
                setCategories([{ id: 0, name: "All" }, ...categoriesResponse.data]);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    const handleSearch = (text) => setSearch(text);

    const handleReset = () => {
        const newItems = items.map((item) => ({ ...item, count: 0 }));
        setItems(newItems);
    };

    const handleSelected = (id) => {
        setSelected(id);
    };

    // Filter 
    let filtered = selected === 0
        ? items
        : items.filter((item) => {
            const matches = item.category == selected;
            console.log(`Item: ${item.name}, Category: ${item.category}, Selected: ${selected}, Matches: ${matches}`);
            return matches;
        });

    if (search.trim() !== "") {
        filtered = filtered.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }


    //pagination
    const noOfPages = Math.ceil(filtered.length / pageSize);
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const paginatedItems = filtered.slice(start, end);

    const handleCurrentPage = (page) => setCurrentPage(page);

    const handleAddNewProduct = (product) => {
        const newItems = [...items, product];
        setItems(newItems);
    };

    const handleEditProduct = (updatedProduct) => {
        axios.put(`${apiURL}/menu/${updatedProduct.id}`, updatedProduct);
        const newItems = items.map((item) =>
            item.id === updatedProduct.id ? updatedProduct : item
        );
        setItems(newItems);
    };


    const handleClickPlus = (id) => {
        const newItems = items.map((item) =>
            item.id === id ? { ...item, count: (item.count || 0) + 1 } : item
        );
        setItems(newItems);
    };

    const handleClickSub = (id) => {
        const newItems = items.map((item) =>
            item.id === id && (item.count) > 0
                ? { ...item, count: item.count - 1 }
                : item
        );
        setItems(newItems);
    };

    const handleAddToCart = (id) => {
        const newItems = items.map((item) =>
            item.id === id ? { ...item, isInCart: !item.isInCart } : item
        );
        setItems(newItems);
    };


    const handleClickDel = async (id) => {
        try {
            await axios.delete(`${apiURL}/menu/${id}`);
            const newItems = items.filter((item) => item.id !== id);
            setItems(newItems);
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <>
            <Navbar noOfItem={items.reduce((sum, itm) => sum + (itm.count || 0), 0)} />
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route
                    path="/admin"
                    element={
                        <Admin
                            items={items}
                            categories={categories}
                            loading={loading}
                            HandleClickdel={handleClickDel}
                        />
                    }
                />
                <Route path="/parent" element={<Parent />} />
                <Route path="/home" element={<Home />} />
                <Route
                    path="/menu"
                    element={
                        <Menu
                            items={paginatedItems}
                            HandleAddtocart={handleAddToCart}
                            loading={loading}
                            categories={categories}
                            selected={selected}
                            HandleSelected={handleSelected}
                            noOfPages={noOfPages}
                            currentpage={currentPage}
                            Handlecurrentpage={handleCurrentPage}
                            search={search}
                            HandleSearch={handleSearch}
                        />
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <Cart
                            items={items.filter((item) => item.isInCart)}
                            HandleClickplus={handleClickPlus}
                            HandleClicksub={handleClickSub}
                            HandleClickdel={handleClickDel}
                            HandleReset={handleReset}
                        />
                    }
                />
                <Route
                    path="/AddProduct"
                    element={
                        <AddProduct
                            categories={categories}
                            HandleAddNewProduct={handleAddNewProduct}
                        />
                    }
                />
                <Route
                    path="/EditProduct/:id"
                    element={
                        <EditProduct
                            categories={categories}
                            HandleEditProduct={handleEditProduct}
                        />
                    }
                />
                <Route path="/product/:id/" element={<Product />} />
                <Route path="/about" element={<About />}>
                    <Route path="company" element={<Aboutcompany />} />
                    <Route path="people" element={<Aboutpeople />} />
                </Route>
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    );
}