import Image from "next/image";
import Button from "./Button";
import Link from "next/link";


const PizzaCard = ({pizza}) => {
    console.log('Pizza Card Data:', pizza);

    return (
    
        <div className=" flex flex-col justify-center gap-10 ">
                {/* single item */}
            
            <div className="flex flex-col gap-4 h-[500px] border cursor-pointer">
            
                <Link href={`/products/${pizza._id}`} >
                    <div className="h-1/2 p-4">
                        <Image src={pizza.img} alt="" width={300} height={300} />
                    </div>               
            
                    <div className="mt-16">
                        <div className="flex gap-32 m-4">
                            <h1 className="text-xl font-semibold"> {pizza.title} </h1>
                            <span className="text-red-500 font-bold"> ${pizza.prices[0]} </span>
                        </div>
                    
                        <p className="m-4"> {pizza.desc} </p>

                        <div className="mt-8 px-4">
                            <Button />
                        </div>

                    </div>
                </Link>
            </div>          
            
        </div>
    )
}


export default PizzaCard