import React from 'react'

export default function Filter({ HandleSelected, selected, categories }) {
    return (
        <ul >
            {categories.map((cat) => (
                <li className={`p-3 border cursor-pointer hover:bg-amber-100 transition-all ${cat.id == selected && "bg-amber-300 hover:bg-amber-300"}`} key={cat.id} onClick={() => HandleSelected(cat.id)}>{cat.name}</li>
            ))}
        </ul>
    )
}
