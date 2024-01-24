const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 60
    },
    desc: {
        type: String,
        required: true,
        maxLength: 200
    },
    img: {
        type: String,
        required: true,
    },
    prices: {
        type: [Number],
        required: true,
    },
    extraOptions: [
        {
            text: { type: String, required: true },
            price: { type: Number, required: true },
        },
    ],
}, {timestamps:true});

mongoose.models = {}

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);













