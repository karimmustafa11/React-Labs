import React from 'react';
import Togglebutton from '../components/Togglebutton';
import Filter from '../components/Filter';

export default function Menu({
    items,
    HandleAddtocart,
    loading,
    categories,
    selected,
    HandleSelected,
    noOfPages,
    currentpage,
    Handlecurrentpage,
    search,
    HandleSearch,
}) {


    const pages = Array(noOfPages).fill(0).map((item, i) => i + 1);

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center mt-14">
                <div role="status">
                    <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <div className="text-center mt-1.5">
            <div className="mt-4 mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => HandleSearch(e.target.value)}
                    className="border px-2 py-1 mb-3 rounded"
                />
            </div>

            <h1>Menu Items</h1>
            <div className="grid grid-cols-3 gap-1.5">
                <div className="col-span-1 ms-3 mt-7">
                    <h1 className="mb-3">Choose Your Category</h1>
                    <Filter
                        categories={categories}
                        selected={selected}
                        HandleSelected={HandleSelected}
                    />
                </div>
                <div className="overflow-x-hidden col-span-2">
                    {items.length === 0 ? (
                        <p>No items found for this category or search.</p>
                    ) : (
                        <table className="table mt-7 text-center">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Favorite</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.price}💲</td>
                                        <td className="text-center">
                                            <Togglebutton
                                                handler={HandleAddtocart}
                                                id={item.id}
                                                isactive={item.isInCart}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {noOfPages > 1 && (
                        <nav aria-label="Page navigation example" className="mt-4 ms-10">
                            <ul className="inline-flex -space-x-px text-sm">
                                <li>
                                    <button
                                        onClick={() => Handlecurrentpage(currentpage - 1)}
                                        disabled={currentpage === 1}
                                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                </li>
                                {pages.map((page) => (
                                    <li key={page}>
                                        <button
                                            onClick={() => Handlecurrentpage(page)}
                                            className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentpage === page
                                                ? "bg-blue-500 text-white"
                                                : "bg-white text-gray-500"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        onClick={() => Handlecurrentpage(currentpage + 1)}
                                        disabled={currentpage === noOfPages}
                                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
}