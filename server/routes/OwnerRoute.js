const router = require('express').Router();
const OwnerRoute = require('../models/OwnerModel');
const upload = require('../middlewares/UploadPhoto')

// POST request
router.post('/owners', upload.single("photo"), async (req, res) => {
    try {
        const owner = new OwnerRoute();
        owner.name = req.body.name;
        owner.about = req.body.about;
        owner.photo = req.file.location;
        await owner.save();

        res.json({
            success: true,
            message: "successfully created new owner"
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
});


// GET api
router.get('/owners', async (req, res) => {
    try {
        let owners = await OwnerRoute.find();
        res.json({
            owners
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
});


module.exports = router;
