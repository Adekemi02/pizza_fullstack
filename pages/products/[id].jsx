"use client";
import React from 'react';
import styles from '@/styles/Product.module.css';
import Image from 'next/image';
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from '@/redux/cartSlice';
import { BASE_API_URL } from '../utils/connectUrl';




const Product = ({pizza}) => {
    const [price, setPrice] = useState(pizza.prices[0]);
    const [size, setSize] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [extras, setExtras] = useState([]);
    const dispatch = useDispatch();


    const changePrice = (number) => {
        setPrice(price + number);
    };

    const handleSize = (sizeIndex) => {
        const difference = pizza.prices[sizeIndex] - pizza.prices[size];
        setSize(sizeIndex);
        changePrice(difference);
    };

    const handleChange = (e, option) => {
        const checked = e.target.checked;

        if (checked) {
            changePrice(option.price);
            setExtras((prev) => [...prev, option]);

        } else {
            changePrice(-option.price);
            setExtras(extras.filter((extra) => extra._id !== option._id));
        }
    };

    const handleClick = () => {
        dispatch(addProduct({...pizza, extras, price, quantity}));
    };


    return (
        <div className="h-[calc(100vh-96px)] flex px-6">
            <div className="flex flex-1 h[100%] items-center justify-center">
                <div className="w-[80%] h-[80%] relative">
                    <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
                </div>
            </div>

            <div className="flex-1 mt-14">
                <h1 className="font-semibold text-3xl mb-2">{pizza.title}</h1>
                <span className="text-red-500 font-semibold mr-4">${price}</span>
                <span className="text-gray-300 font-semibold"> 8 Reviews </span>
            
                <p className="mt-4"> {pizza.desc} </p>
                <p className="mt-4">Category: Chicken, Launch, Pizza, Burger </p>
                <p className="mt-4"> Tags: Healthy, Organic, Chicken, Sauce </p>
                
                <h1 className="font-semibold mb-4 mt-8"> Choose Pizza Size </h1>

                <div className="w-[35%] flex justify-between items-center">
                    <div className={styles.size} onClick={() => handleSize(0)}>
                        <Image src="/images/pizza_size.png" layout="fill" alt="" />
                        <span className={styles.number}>Small</span>
                    </div>

                    <div className={styles.size} onClick={() => handleSize(1)}>
                        <Image src="/images/pizza_size.png" layout="fill" alt="" />
                        <span className={styles.number}>Medium</span>
                    </div>

                    <div className={styles.size} onClick={() => handleSize(2)}>
                        <Image src="/images/pizza_size.png" layout="fill" alt="" />
                        <span className={styles.number}>Large</span>
                    </div>
                </div>
                
                <div className="mt-10 font-semibold">
                    <h1 className="mb-2"> Choose additional ingredients </h1>
                    
                    <div className="flex mb-8">
                        {pizza.extraOptions.map(option => (
                            <div className={styles.option} key={option._id}>
                                <input
                                    type="checkbox"
                                    id={option.text}
                                    name={option.text}
                                    className={styles.checkbox}
                                    onChange={(e) => handleChange(e, option)}
                                />
                                <label htmlFor="double"> {option.text} </label>
                            </div>
                        ))}
                        

                    </div>

                    <div className="flex items-center gap-4 mt-6">
                        <input 
                            type="number" 
                            min="1" step="1" 
                            className="border h-9 w-32"
                            defaultValue={1}
                            onChange={(e) => setQuantity(e.target.value)}
                        />

                        <button
                            className="bg-goldenyellow hover:bg-red-500 transition-all duration-300 rounded-full font-semibold uppercase text-white w-32 m-2 py-2"
                            onClick={handleClick}
                        > 
                            Add to Cart 
                        </button>

                        <span className="h-12 w-12 border rounded-[100%]">
                            <Image src="/images/heart_icon.png" alt="" width={15} height={15} className="relative top-4 left-4" />
                        </span>
                    </div>
                </div>
               
            </div>
        </div>
    )
}


export const getServerSideProps = async ({params}) => {

  const res = await axios.get(`${BASE_API_URL}/api/products/${params.id}`);
  
  return {
    props: {
      pizza: res.data,
    
    },
  };
};


export default Product


