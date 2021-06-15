const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gifSchema = new Schema({
    title: {type: String, required: true},
    tags: {type: Array, required: false},
    gifUrl: {type: String, required: true},
    previewUrl: {type: String, required: true},
    description: {type: String, required: false},
    catagories: {type: Array, required: false},
    author: {type: String, required: false}
}, {timestamps: true })

const Gif = mongoose.model('Gif', gifSchema)

module.exports = Gif