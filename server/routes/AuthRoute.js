const router = require('express').Router();
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');


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


module.exports = router;
