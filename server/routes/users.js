const router = require('express').Router()
const bcrypt = require('bcrypt')
let User = require('../models/user.model')


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post( async (req, res) => {
        
        const hashedPassword = await bcrypt.hash(req.body.password)
        const username = req.body.username
        const password = hashedPassword
        const email = req.body.email

        const newUser = new User({username, password, email})

        newUser.save()
            .then(() => res.json('User added!'))
            .catch(err => res.status(400).json('Error: ' + err))
    
})




module.exports = router