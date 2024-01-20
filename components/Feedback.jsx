import Image from 'next/image'
import React from 'react'



const Clients = [
    {
        id: 1,
        img: "/images/client-1.jpg",
        name: "John Doe",
        text: "Lorem ipsum is simply dummy text of the print book. It has survived not only five centuries, but also the leap"
    },
    {
        id: 2,
        img: "/images/client-2.jpg",
        name: "John Doe",
        text: "Lorem ipsum is simply dummy text of the print book. It has survived not only five centuries, but also the leap"
    },
    {
        id: 3,
        img: "/images/client-3.jpg",
        name: "John Doe",
        text: "Lorem ipsum is simply dummy text of the print book. It has survived not only five centuries, but also the leap"
    },
    {
        id: 4,
        img: "/images/client-4.jpg",
        name: "John Doe",
        text: "Lorem ipsum is simply dummy text of the print book. It has survived not only five centuries, but also the leap"
    }
];



const Feedback = () => {
    return (
        <div className="px-4">
            <div className="mb-8">
                <Image src="/images/leaf.png" alt="" width={90} height={90} />
                <h1 className="text-red-500 font-semibold"> Customer Feedback</h1>
                <p className="font-semibold text-2xl"> Client Testimonials</p>
            </div>

            <div className="flex gap-4 text-center">
                {Clients.map((item) => (
                    <div key={item.id} className="flex flex-col gap-4 items-center justify-center border h-[60vh]">
                        <div className="">
                            <Image src={item.img} alt="" width={80} height={80} className="rounded-full" />
                        </div>
                        
                        <h1 className="font-semibold text-lg"> {item.name} </h1>
                        <p className="text-center mx-12"> {item.text} </p>
                    </div>
                ))}
                
            </div>
        </div>
    )
}

export default Feedback