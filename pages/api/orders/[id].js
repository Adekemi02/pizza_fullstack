import dbConnect from "@/utils/dbConnect";
import Order from "@/models/Order";



const handler = async (req, res) => {
    const {method, query: {id}} = req;

    await dbConnect()

    if(method === 'GET') {
        try {
            const order = await Order.findById(id)

            res.status(200).json(order)

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    if(method ==='PUT') {
        try {
            let data = req.body;

            const order = await Order.findByIdAndUpdate(id, data,
                { new: true }) // return the updated document

            res.status(201).json(order)
            
        } catch (err) {
            res.status(500).json(err)
        }
    }

    if(method ==='DELETE') {}
}


export default handler