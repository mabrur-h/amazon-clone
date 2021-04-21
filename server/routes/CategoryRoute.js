const router = require('express').Router();
const CategoryRoute = require('../models/CategoryModel')


// POST request
router.post('/categories', async (req, res) => {
    try {
        const category = new CategoryRoute();
        category.type = req.body.type;

        await category.save();

        res.json({
            success: true,
            message: "successfully created new category"
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
});


// GET request
router.get('/categories', async (req, res) => {
    try {
        let categories = await CategoryRoute.find();
        res.json({
            success: true,
            categories
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
})

module.exports = router;
