import React from 'react';
import { useState } from "react";



const OrderDetail = ({total, createOrder}) => {
    const [customer, setCustomer] = useState("");
    const [address, setAddress] = useState("");

    const handleClick = () => {
        createOrder({ customer, address, total, method: 0 });
    };

    return (
        <div className="w-[100%] h-[100vh] absolute top-0 left-0 flex z-[999] bg-gray-300 bg-opacity-60 items-center justify-center">
            <div className="w-[500px] bg-white p-12 rounded-[20px] flex flex-col items-center justify-center">
                <h1 className="font-medium text-4xl mb-2"> You will pay $12 on delivery. </h1>
                
                <div className="flex flex-col w-[100%] mb-4">
                    <label className="mb-3"> Name Surname </label>
                    <input 
                        type="text" 
                        placeholder="John Doe"
                        className="h-[40px] border"
                        onChange={(e) => setCustomer(e.target.value)}
                    />
                </div>

                <div className="flex flex-col w-[100%] mb-4">
                    <label className="mb-3"> Phone Number </label>
                    <input 
                        type="tel" 
                        placeholder="+1 234 567 89"
                        className="h-[40px] border"
                    />
                </div>

                <div className="flex flex-col w-[100%] mb-4">
                    <label className="mb-3"> Address </label>
                    <textarea
                        rows={5}
                        placeholder="Elton St. 505 NY"
                        type="text"
                        className="border"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <button 
                    className="py-2 px-5 font-medium rounded-[10px] border border-black bg-goldenyellow"
                    onClick={handleClick}
                > 
                    Order
                </button>
            </div>
        </div>
    )
}

export default OrderDetail