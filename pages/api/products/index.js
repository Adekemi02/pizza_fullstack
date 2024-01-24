import dbConnect from "@/pages/api/utils/dbConnect"
import Product from "@/pages/api/models/Product";


export default async function handler(req, res) {
  const { method } = req;

  dbConnect()

  if(method === 'GET') {
    try {
      const products = await Product.find()

      res.status(200).json(products)

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
