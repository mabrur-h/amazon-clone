const router = require('express').Router();
const Address = require('../models/AddressModel');
const VerifyToken = require('../middlewares/VerifyToken')

router.post("/addresses", VerifyToken, async (req, res) => {
    try {
        let address = new Address();
        address.user = req.decoded._id;
        address.country = req.body.country;
        address.fullName = req.body.fullName;
        address.streetAddress = req.body.streetAddress;
        address.city = req.body.city;
        address.state = req.body.state;
        address.zipCode = req.body.zipCode;
        address.phoneNumber = req.body.phoneNumber;
        address.deliverInstructions = req.body.deliverInstructions;
        address.securityCode = req.body.securityCode;


    } catch (e) {

    }
})


module.exports = router
