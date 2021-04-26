const router = require('express').Router();
const Review = require('../models/ReviewModel');
const Product = require('../models/ProductModel');
const VerifyToken = require('../middlewares/VerifyToken');
const UploadPhoto = require('../middlewares/UploadPhoto');


router.post('/reviews/:productID',
    [VerifyToken, UploadPhoto.single("photo")],
    async (req, res) => {
    try {
        const review = new Review();
        review.headline = req.body.headline;
        review.body = req.body.body;
        review.rating = req.body.rating;
        review.photo = req.file.location;
        review.user = req.decoded._id;
        review.productID = req.params.productID;

        await Product.update({ $push: { rating: review._id } })

        const savedReview = await review.save();

        if ( savedReview ) {
            res.json({
                success: true,
                message: "Successfully added review"
            })
        }

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
})


router.get('/reviews/:productID', async (req, res) => {
    try {
        const productReviews = await Review.find({
            productID: req.params.productID
        }).populate('users').exec();

        res.json({
            success: true,
            reviews: productReviews
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
})


module.exports = router;
