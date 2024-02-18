import React, {useState} from "react";
import styles from "@/styles/Admin.module.css";
import axios from "axios";
import Image from "next/image";
import { BASE_URL } from "@/utils/connectUrl";




const AdminPage = ({orders, products}) => {
    const [pizzaList, setPizzaList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    const status = ["preparing", "on the way", "delivered"];


    const handleDelete = async (id) => {
        try {
            const res = await axios.delete("http://localhost:3000/api/products/" + id)
            setPizzaList(pizzaList.filter((pizza) => pizza._id !== id))

        } catch (err) {
            console.log(err)
        }
    };

    const handleStatus = async (id) => {
        const item = orderList.filter((order) => order._id === id)[0];
        const currentStatus = item.status;

        try {
            const res = await axios.put("http://localhost:3000/api/orders/" + id, {
                status: currentStatus + 1,
            });

            setOrderList([
                res.data,
                ...orderList.filter((order) => order._id !== id),
            ]);

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="p-4 mt-5 flex gap-10">
            <div className="w-1/2">
                <h1 className="text-2xl mb-2 font-semibold"> Products </h1>

                <table className="w-full">
                    <thead className="border-b border-b-gray-200">
                        <tr className="text-left">
                            <th className="mb-2 py-2"> Image </th>
                            <th className="mb-2 py-2"> Id </th>
                            <th className="mb-2 py-2"> Title </th>
                            <th className="mb-2 py-2"> Price </th>
                            <th className="mb-2 py-2"> Action </th>
                        </tr>
                    </thead>

                    {pizzaList.map((product) => (
                        <tbody key={product._id}>
                            <tr className="align-top border-b border-b-gray-200">
                                <td className="py-2">
                                    <Image
                                        src={product.img}
                                        width={70}
                                        height={70}
                                        objectFit="cover"
                                        alt=""
                                    />
                                </td>
                                <td className=" py-2"> {product._id.slice(0, 6)}... </td>
                                <td className=" py-2"> {product.title} </td>
                                <td className=" py-2"> ${product.prices[0]} </td>
                                <td className="text-white py-2 font-semibold">
                                    <button className={styles.button}> Edit </button>
                                    <button
                                        className={styles.button}
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>

            <div className="w-1/2">
                <h1 className="text-2xl mb-2 font-semibold"> Orders </h1>

                <table className="w-full">
                    <thead className="border-b border-b-gray-200">
                        <tr className="text-left">
                            <th className="mb-2 py-2"> Id </th>
                            <th className="mb-2 py-2"> Customer </th>
                            <th className="mb-2 py-2"> Total </th>
                            <th className="mb-2 py-2"> Payment </th>
                            <th className="mb-2 py-2"> Status </th>
                            <th className="mb-2 py-2"> Action </th>
                        </tr>
                    </thead>

                    {orderList.map((order) => (
                        <tbody key={order._id}>
                            <tr className="align-top border-b border-b-gray-200">
                                <td>{order._id.slice(0, 6)}...</td>
                                <td>{order.customer}</td>
                                <td>${order.total}</td>
                                <td>
                                    {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                                </td>
                                <td>{status[order.status]}</td>
                                <td>
                                    <button 
                                        className="bg-green-600 text-white font-semibold px-2 my-2"
                                        onClick={() => handleStatus(order._id)}
                                    >
                                        Next Stage
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    );
};


export const getServerSideProps = async () => {
    // const myCookie = ctx.req?.cookies || "";

    // if (myCookie.token !== process.env.TOKEN) {
    //     return {
    //     redirect: {
    //         destination: "/admin/login",
    //         permanent: false,
    //     },
    //     };
    // }

    const productRes = await axios.get("http://localhost:3000/api/products");
    const orderRes = await axios.get("http://localhost:3000/api/orders");

    return {
        props: {
        orders: orderRes.data,
        products: productRes.data.data,
        },
    };
};


export default AdminPage