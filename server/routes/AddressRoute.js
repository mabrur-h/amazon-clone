const router = require('express').Router();
const Address = require('../models/AddressModel');
const User = require('../models/UserModel');
const VerifyToken = require('../middlewares/VerifyToken')
const axios = require('axios')


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

        await address.save();
        res.json({
            success: true,
            message: "Address added successfully!"
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
});


router.get('/addresses', VerifyToken, async (req, res) => {
     try {
         let addresses = await Address.find({ user: req.decoded._id })

         res.json({
             success: true,
             addresses: addresses
         })
     } catch (e) {
         res.status(500).json({
             success: false,
             message: e.message
         })
     }
})


router.get('/countries', async (req, res) => {
    try {
        let response = await axios.get("https://restcountries.eu/rest/v2/all");

        res.json(response.data);

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
})

router.put('/address/:id', VerifyToken, async (req, res) => {
    try {
        let foundAddress = await Address.findOne({ _id: req.params.id })
        if ( foundAddress ) {

            if (req.body.country) foundAddress.country = req.body.country;
            if (req.body.fullName) foundAddress.fullName = req.body.fullName;
            if (req.body.streetAddress) foundAddress.streetAddress = req.body.streetAddress;
            if (req.body.city) foundAddress.city = req.body.city;
            if (req.body.state) foundAddress.state = req.body.state;
            if (req.body.zipCode) foundAddress.zipCode = req.body.zipCode;
            if (req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber;
            if (req.body.deliverInstructions) foundAddress.deliverInstructions = req.body.deliverInstructions;
            if (req.body.securityCode) foundAddress.securityCode = req.body.securityCode;

            await foundAddress.save();

            res.json({
                success: true,
                message: "Address successfully updated"
            })

        }
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
});


router.delete('/addresses/:id', VerifyToken, async (req, res) => {
    try {
        let deletedAddress = await Address.remove({ user: req.decoded._id, _id: req.params.id })

        if ( deletedAddress ) {
            res.json({
                success: true,
                message: "Address successfully deleted"
            })
        }
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
})


router.put('/addresses/set/default', VerifyToken, async (req, res) => {
    try {
        const doc = await User.findOneAndUpdate({ _id: req.decoded._id }, { $set: { address: req.body._id } });
        if ( doc ) {
            res.json({
                success: true,
                message: "Address successfully set as default"
            })
        }
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
})

module.exports = router
