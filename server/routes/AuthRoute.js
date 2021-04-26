const router = require('express').Router();
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/VerifyToken');


router.post('/auth/signup', async(req, res) => {
    if ( !req.body.email || !req.body.password ) {
        return res.json({ success: false, message: "Please enter email or password!" })
    } else {
        try {
            let newUser = new User();
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            await newUser.save();

            let token = jwt.sign(newUser.toJSON(), process.env.SECRET_WORD, {
                expiresIn: 60480
            });

            res.json({
                success: true,
                token: token,
                message: "Successfully created a new user!"
            })
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message
            })
        }
    }
});


router.get('/auth/user', verifyToken, async (req, res) => {
    try {
        let foundUser = await User.findOne({ _id: req.decoded._id });
        if ( foundUser ) {
            res.json({
                success: true,
                user: foundUser
            })
        }
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
})


router.put('auth/user', verifyToken, async (req, res) => {
    try {
        let foundUser = await User.findOne({ _id: req.decoded._id });
        if ( foundUser ) {
            if ( req.body.name ) foundUser.name = req.body.name;
            if ( req.body.email ) foundUser.email = req.body.email;
            if ( req.body.password ) foundUser.password = req.body.password;

            await foundUser.save();

            res.json({
                success: true,
                message: "Successfully updated!"
            })
        }
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e
        })
    }
})


router.post('/auth/login', async (req, res) => {
    try {
        let foundUser = await User.findOne({ email: req.body.email });
        if ( !foundUser ) {
            res.status(500).json({
                success: false,
                message: "Authentication failed, user not found!"
            })
        } else {
            if ( foundUser.comparePassword(req.body.password) ) {
                let token = jwt.sign(foundUser.toJSON(), process.env.SECRET_WORD, {
                    expiresIn: 60480
                })

                res.json({
                    success: true,
                    token: token
                })
            } else {
                res.status(403).json({
                    success: false,
                    message: "Authentication failed, wrong password!"
                })
            }
        }
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Authentication failed, user not found!"
        })
    }
})

module.exports = router;
