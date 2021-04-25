const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    categoryID: {
        type: Schema.Types.ObjectId,
        ref: "categories"
    },
    ownerID: {
        type: Schema.Types.ObjectId,
        ref: "owners"
    },
    title: String,
    description: String,
    photo: String,
    price: Number,
    stockQuantity: Number,
    rating: [Number]
});

module.exports = mongoose.model('products', ProductSchema)
