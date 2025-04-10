import React from "react";

export default function CartItem(props) {
    return (
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow mb-3">
            <span className="text-lg font-medium text-gray-800">{props.name}</span>

            <div className={`px-3 py-1 rounded-lg ${props.count ? "bg-green-200" : "bg-amber-200"}`}>
                {props.count}
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => props.HandleClickplus(props.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
                >
                    +
                </button>

                <button
                    onClick={() => props.HandleClicksub(props.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 "
                >
                    -
                </button>

                <button
                    onClick={() => props.HandleClickdel(props.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
