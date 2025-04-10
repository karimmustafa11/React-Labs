import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddProduct({ categories, HandleAddNewProduct }) {
    const navigate = useNavigate();
    const [form, setform] = useState({ name: "", price: "", category: 1 });

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = { ...form, count: 0, isInCart: false };
        const { data } = await axios.post("http://localhost:3000/menu/", product);
        HandleAddNewProduct(data);
        navigate("/admin");
    };

    return (
        <div className="max-w-xl mx-auto mt-3">
            <h1 className="text-xl font-bold mb-3">Add new Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" className="input" onChange={handleChange} value={form.name} required />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="price">Price</label>
                    <input type="text" id="price" name="price" className="input" onChange={handleChange} value={form.price} required />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category" className="input" onChange={handleChange} value={form.category}>
                        {[...categories].splice(1).map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <button className="btn btn-dash">Add</button>
            </form>
        </div>
    );
}