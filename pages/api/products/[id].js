import dbConnect from "@/pages/api/utils/dbConnect";
import Product from "@/pages/api/models/Product";


export default async function handler(req, res) {
    const { 
        method,
        query: {id} 
    } = req;

    dbConnect()

    if(method === 'GET') {
        try {
            const product = await Product.findById(id)

            res.status(200).json(product)

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    if(method === 'PUT') {
        try {
            let data = req.body;

            const product = await Product.findByIdAndUpdate(id, data,
                { new: true }) // return the updated document

            res.status(201).json(product)
            
        } catch (err) {
            res.status(500).json(err)
        }
        
    }

    if(method === 'DELETE') {
        try {
            await Product.findByIdAndDelete(id)

            res.status(201).json({message: "Item deleted successfully!"})
            
        } catch (err) {
            res.status(500).json(err)
        }
        
    }
}
