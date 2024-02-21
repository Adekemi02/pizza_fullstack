import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import { reset, removeFromCart } from "@/redux/cartSlice";
import axios from "axios";
import OrderDetail from '@/components/OrderDetail';
import { BASE_API_URL } from '../utils/connectUrl';



const CartPage = () => {
    const cart = useSelector((state) => state.cart);
    const [open, setOpen] = useState(false);
    const [cash, setCash] = useState(false);
    const amount = cart.total;
    const currency = "USD";
    const style = { layout: "vertical" };
    const dispatch = useDispatch();
    const router = useRouter();


    const createOrder = async (data) => {
        try {
            const res = await axios.post(`${BASE_API_URL}/api/orders`, data);
            
            if (res.status === 201) {
                dispatch(reset());
                router.push(`/orders/${res.data._id}`);
            }

        } catch (err) {
            console.log(err);
        }
    };

    const handleRemoveItem = (productId, instanceId) => {
        // Dispatch the removeFromCart action with the product ID
        dispatch(removeFromCart({productId, instanceId}));
    };

    // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = ({ currency, showSpinner }) => {
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);

        return (
            <>
                {showSpinner && isPending && <div className="spinner" />}
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[amount, currency, style]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {

                        return actions.order
                        .create({
                            purchase_units: [
                            {
                                amount: {
                                currency_code: currency,
                                value: amount,
                                },
                            },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function (details) {
                        const shipping = details.purchase_units[0].shipping;
                        createOrder({
                            customer: shipping.name.full_name,
                            address: shipping.address.address_line_1,
                            total: cart.total,
                            method: 1,
                        });
                        });
                    }}
                />
            </>
        );
    };


    return (
        <div className='w-full px-4 flex mt-11'>
        {/* PRODUCT TABLE */}
            <div className="flex-[2]">         
                <table className="w-full">
                    <thead className="border-b border-b-gray-200">
                        <tr className="text-left">
                            <th className="mb-2 py-2">Product</th>
                            <th className="mb-2 py-2">Name</th>
                            <th className="mb-2 py-2">Extra</th>
                            <th className="mb-2 py-2">Price</th>
                            <th className="mb-2 py-2">Quantity</th>
                            <th className="mb-2 py-2">Total</th>
                        </tr>
                    </thead>
                    
                    <tbody className=""> 
                        {cart.products.map((product) => (
                            <tr key={product._id} className="align-top border-b border-b-gray-200" >
                                <td className="py-2">
                                    
                                    <div className="">
                                        <Image src={product.img} alt="" width={80} height={80} />
                                    </div>

                                    
                                </td>
                                <td className=" py-2"> {product.title} </td>
                                <td className=" py-2"> 
                                    {product.extras.map((extra) => (
                                        <span key={product._id}> {extra.text}, </span>
                                    ))}
                                </td>
                                <td className=" py-2"> ${product.price} </td>
                                <td className=" py-2"> ${product.quantity} </td>
                                <td className=" py-2 mr-1"> ${product.price * product.quantity} 
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleRemoveItem(product._id)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}           
                        
                    </tbody> 
                            
                </table>            
            
            </div>

            {/* CART CONTAINER */}
            <div className="bg-gray-800 flex-1 w-[90%] h-[300px] text-white mr-6">
                <div className="flex flex-col justify-center mt-8 px-10">
                    <h1 className="uppercase text-white font-semibold text-lg mb-4"> Cart Total </h1>
                    
                    <div>
                        <span className="font-semibold mr-2"> Subtotal: </span> 
                        <span> ${cart.total} </span>
                    </div>

                    <div>
                        <span className="font-semibold mr-2"> Discount: </span> 
                        <span> $0.00 </span>
                    </div>

                    <div>
                        <span className="font-semibold mr-2">Total: </span>
                        <span> ${cart.total} </span>
                    </div>

                    {open ? (
                        <div className="flex flex-col mt-3   ">
                           
                            <button 
                                className="uppercase font-semibold text-teal-400 mb-2 py-2 px-2 bg-white"
                                onClick={() => setCash(true)}    
                            >
                                Cash on delivery
                            </button>

                            <PayPalScriptProvider
                                options={{
                                    "client-id":
                                        "AX9tkNZvf_3VGFVY9cMGpxSxZ_gELD8s2VQRVrodEQRf-8KlPuLTQnkSrPpA1JpVdj6SANY8-BLEXPSH",
                                    components: "buttons",
                                    currency: "USD",
                                    "disable-funding": "credit,card,p24",
                                }}
                            >

                                <ButtonWrapper currency={currency} showSpinner={false} />
                            </PayPalScriptProvider>
                        </div>
                        

                    ) : (
                        <button 
                            type="submit" 
                            className="mt-10 bg-goldenyellow hover:bg-red-700 transition-all duration-300 font-bold p-2 uppercase rounded-full"
                            onClick={() => setOpen(true)}
                        > 
                            Checkout Now! 
                        </button>
                    )}
                    
                </div>                
            </div>
            {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
        </div>   

    )
}

export default CartPage