const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth.middleware')
let User = require('../models/user.model')


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.get('/protected', auth, (req, res) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated!"});
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
router.route('/login').post( (req, res) => {
    
    User.findOne({username: req.body.username}).then( (user) => {
        if (!user) {
            return res.status(401).json({ success: false, msg: "could not find user" });
        }

        bcrypt.compare(req.body.password, user.hash).then((isValid) => {
            if (isValid) {
                // Issue json web token
                const _id = user._id;
                const expiresIn = '1d';
                
                const payload = {
                    sub: _id,
                    iat: Date.now()
                };
                
                const signedToken = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: expiresIn });

                res.status(200).json({token: signedToken})
                

            } else {
                res.status(401).json('Wrong password')
            }
        })

        
        
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