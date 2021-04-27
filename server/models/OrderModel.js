const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const OrderSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    products: [{
        productID: { type: Schema.Types.ObjectId, ref: "products" },
        quantity: Number,
        price: Number
    }],
    estimatedDelivery: String
});


OrderSchema.plugin(deepPopulate)

module.exports = mongoose.model('orders', OrderSchema)
