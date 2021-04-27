const router = require('express').Router();
const ProductRoute = require('../models/ProductModel');
const Users = require('../models/UserModel')
const upload = require('../middlewares/UploadPhoto')
const {isAdmin} = require('../middlewares/isAdmin')
/*
    title: String,
    description: String,
    photo: String,
    price: Number,
    stockQuantity: Number,
    rating: [Number]
*/


router.post('/products', upload.single("photo"), async (req, res) => {
    try {
        let product = new ProductRoute();
        product.price = req.body.price;
        product.title = req.body.title
        product.description = req.body.description
        product.photo = req.file.location
        product.stockQuantity = req.body.stockQuantity
        product.categoryID = req.body.categoryID;
        product.ownerID = req.body.ownerID;

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


// GET request - get all products
router.get('/products', async (req, res) => {
    try {
        let products = await ProductRoute
            .find()
            .populate('categoryID ownerID reviews')
            .exec();
        res.json({
            success: true,
            products
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
})

// GET request - get single product
router.get('/products/:id', async (req, res) => {
    try {
        let product = await ProductRoute
            .findOne({_id: req.params.id})
            .populate('categoryID ownerID')
            .exec();
        res.json({
            success: true,
            product
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
})

// PUT request - update a single product
router.put('/products/:id', upload.single("photo"), async (req, res) => {
    try {
        let product = await ProductRoute.findOneAndUpdate({_id: req.params.id}, {
            $set: {
                title: req.body.title,
                price: req.body.price,
                category: req.body.categoryID,
                photo: req.file.location,
                description: req.body.description,
                owner: req.body.ownerID
            }
        }, { upsert: true });

        res.json({
            success: true,
            updatedProduct: product
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
})

// DELETE request - delete a single product
router.delete('/products/:id', async (req, res) => {
    try {
        let deletedProduct = await ProductRoute.findOneAndDelete({ _id: req.params.id })

        if ( deletedProduct ) {
            res.json({
                status: true,
                message: 'successfully deleted'
            })
        }
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
})



module.exports = router;
