import dbConnect from "@/utils/dbConnect";
import Order from "@/models/Order";
import initMiddleware from "@/utils/initMiddleware";
import Cors  from "cors";



const cors = initMiddleware(Cors(
    {
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      origin: process.env.API_BASE_URL,
    }
));

const handler = async (req, res) => {
    await cors (req, res);

    const {method} = req;

    await dbConnect()

    if(method === 'GET') {
        try {
            const orders = await Order.find()

            res.status(200).json({ success: true, data: products })

        } catch (err) {
            res.status(500).json(err)
        }
    }

    if(method ==='POST') {
        try {
            let data = req.body;

            const order = await Order.create(data)

            res.status(201).json(order)
        
        } catch (err) {
            res.status(500).json(err)
        }
    }
}


export default handler