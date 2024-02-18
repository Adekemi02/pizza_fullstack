// "use client"
import React from 'react';
import PizzaCard from './PizzaCard';




const Offers = ({product}) => {

  
    return (
        <>
            <p className="text-red-500 font-semibold px-4"> Popular Dishes </p>
            <h1 className="font-semibold text-2xl px-4 mb-3"> Browse our Menu </h1>
            
            {/* wrapper */}
            <div className=" grid grid-cols-3 justify-around gap-4 p-4">
                
                {/* single item */}
                {product.map((pizza) => (
                    <PizzaCard key={pizza._id} pizza={pizza} />
                    
                ))}
                
            </div>
        </>
    )
}

export default Offers