import PizzaCard from '@/components/PizzaCard';
import Image from 'next/image';
import React from 'react';
import axios from 'axios';
import { BASE_API_URL } from '../utils/connectUrl';




const Products = ({pizzaList}) => {
    return (
        <div className="mt-10"> 
            <div className="flex justify-between items-center px-4">
                <button className="bg-goldenyellow text-white flex justify-center items-center m-2 w-24 rounded-full">
                    <Image src="/images/filter_menu.png" alt="" width={25} height={25} />
                    <span className="text-center font-semibold text-sm my-2"> Filter </span>
                </button>

                <div className="flex gap-10">
                    <div className="font-bold">Showing all 9 results </div>
                    
                    <div className="w-[250px] h-9 border flex justify-between">
                        
                        <span className="px-2 mt-1 text-center"> Default Sorting </span>
                        <div className="mt-2 px-2">
                            <Image src="/images/angle.png" alt="" width={15} height={15} />
                        </div>           
                    </div>
                </div>
            </div>

            <div className=" grid grid-cols-3 justify-around gap-4 p-4">
                
                {pizzaList.map((pizza) => (
                    <PizzaCard key={pizza._id} pizza={pizza} />
                ))}

                {/* <PizzaCard />
                <PizzaCard />
                <PizzaCard />
                <PizzaCard />
                <PizzaCard /> */}
            </div>
                
        
        </div>
    )
};


export const getServerSideProps = async () => {
    const res = await axios.get(`${BASE_API_URL}/api/products`)
    // const res = await fetch(`${BASE_API_URL}/api/products`);
    
    const result = res.data.data

    console.log("API Response:", res);
    console.log("Extracted Data:", result);
    
    return {
        props: {
            pizzaList: Array.isArray(result) ? result : [],        
        },
    };
};

export default Products