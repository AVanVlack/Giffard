const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gifSchema = new Schema({
    title: {type: String, required: true},
    tags: {type: Array, required: true},
    fileName: {type: String, required: true},
    description: {type: String, required: false},
    catagories: {type: Array, required: true},
    date: {type: Date, required: true}
}, {timestamps: true })

const Gif = mongoose.model('Gif', gifSchema)

module.exports = Gif