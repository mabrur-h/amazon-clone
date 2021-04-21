const router = require('express').Router();
const Product = require('../models/ProductModel');

/*
    title: String,
    description: String,
    photo: String,
    price: Number,
    stockQuantity: Number,
    rating: [Number]
*/


router.post('/products', async (req, res) => {
    try {
        let product = new Product();
        product.title = req.body.title
        product.description = req.body.description
        product.photo = req.body.photo
        product.stockQuantity = req.body.stockQuantity

        await product.save()

        res.json({
            success: true,
            message: 'successfully saved'
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
})


module.exports = router;
