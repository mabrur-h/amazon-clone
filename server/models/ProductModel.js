const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "owner"
    },
    title: String,
    description: String,
    photo: String,
    price: Number,
    stockQuantity: Number,
    rating: [Number]
});

module.exports = mongoose.model('product', ProductSchema)
