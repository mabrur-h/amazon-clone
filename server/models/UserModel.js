const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "address"
    }
});


UserSchema.pre('save', function (next) {
    let user = this;
    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if ( err ) next(err)

            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if ( err ) next(err)
                user.password = hash;
                next();
            })
        })
    } else {
        return next();
    }
})

module.exports = mongoose.model('users', UserSchema)


