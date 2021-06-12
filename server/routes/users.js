const router = require('express').Router()
const bcrypt = require('bcrypt')
let User = require('../models/user.model')


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Register a new user
router.route('/register').post( async (req, res) => {

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)
        const username = req.body.username
        const email = req.body.email

        const newUser = new User({username, hash, salt, email})

        newUser.save()
            .then(() => res.json('User added!'))
            .catch(err => res.status(400).json('Error: ' + err))
    
})

// Login user
router.route('/login').post( async (req, res) => {
    
    User.findOne({username: req.body.username}).then( async (user) => {
        if (!user) {
            return res.status(401).json({ success: false, msg: "could not find user" });
        }

        const isValid = await bcrypt.compare(req.body.password, user.hash)

        if (isValid) {
            res.json('You are logged in!!!')
        } else {
            res.status(401).json('Wrong password')
        }
        
    }).catch(err => {
        return res.status(400).json('Error: ' + err)
    });

})

// Update the users profile. Auth = user only
router.route('/updateProfile').post( async (req, res) => {
        
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