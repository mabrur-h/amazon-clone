const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ReviewSchema = new Schema({
    headline: String,
    body: String,
    rating: Number,
    photo: String,
    productID: { type: Schema.Types.ObjectId, ref: "products" },
    user: { type: Schema.Types.ObjectId, ref: "users" }
})


module.exports = mongoose.model('reviews', ReviewSchema);
