import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

export default function Product() {
    const { id } = useParams()
    const [SearchParams] = useSearchParams()

    const year = SearchParams.get('year')
    return (
        <div>
            <h1>Product with id: {id} </h1>
            <h3>Year: {year}</h3>
        </div>
    )
}
