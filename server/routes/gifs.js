const router = require('express').Router()
let Gifs = require('../models/gif.model')

router.route('/').get((req, res) => {
    console.log('hey')
})


module.exports = router