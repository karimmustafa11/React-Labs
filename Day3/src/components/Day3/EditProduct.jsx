import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditProduct({ categories, HandleEditProduct }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setform] = useState({ name: "", price: "", category: 1 });

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(`http://localhost:3000/menu/${id}`);
            setform(data);
        };
        getData();
    }, [id]);

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.put(`http://localhost:3000/menu/${id}`, form);
        HandleEditProduct(data);
        navigate("/admin");
    };

    return (
        <div className="max-w-xl mx-auto mt-3">
            <h1 className="text-xl font-bold mb-3">Edit Product</h1>
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
                <button className="btn btn-dash">Update</button>
            </form>
        </div>
    );
}