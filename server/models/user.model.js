const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String, 
        required: true,
        uniue: true,
        trim: true,
        minlength: 3
    },
    email: {type: String, required: true},
    hash: {type: String, required: true},
    salt: {type: String, required: false},
    bio: {type: String, required: false},
    website: {type: String, required: false},
    image: {type: Object, required: false},
    stared: {type: Array, required: false}
}, {timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User