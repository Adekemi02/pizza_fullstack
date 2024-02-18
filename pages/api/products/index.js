import dbConnect from "@/utils/dbConnect"
import Product from "@/models/Product";
import initMiddleware from "@/utils/initMiddleware";
import Cors  from "cors";




const cors = initMiddleware(Cors(
  {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: process.env.API_BASE_URL,
  }
));

export default async function handler(req, res) {
  await cors (req, res);

  const { method } = req;

  await dbConnect();

  if(method === 'GET') {
    try {
      const products = await Product.find()

      res.status(200).json({ success: true, data: products })

    } catch (err) {
        res.status(500).json(err)
    }
  }

  if(method === 'POST') {
    try {
        let data = req.body;

        const product = await Product.create(data)

        res.status(201).json(product)
        
    } catch (err) {
        res.status(500).json(err)
    }
    
  }
};
