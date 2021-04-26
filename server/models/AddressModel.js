const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "users" },
    country: String,
    fullName: String,
    streetAddress: String,
    city: String,
    zipCode: Number,
    phoneNumber: Number,
    deliverInstructions: String,
    securityCode: String
});

module.exports = mongoose.model('addresses', AddressSchema)
