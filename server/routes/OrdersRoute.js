const router = require('express').Router();
const Order = require('../models/OrderModel')
const VerifyToken = require('../middlewares/VerifyToken')


router.get('/orders', VerifyToken, async (req, res) => {
    try {
        let products = await Order.find({ owner: req.decoded._id })
            .deepPopulate("owner products.productID.owner")
            .exec();
        res.json({
            success: true,
            products
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
})


module.exports = router;
