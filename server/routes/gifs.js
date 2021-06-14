const router = require('express').Router()
const multer = require("multer")
const path = require('path')

const auth = require('../middleware/auth.middleware')
const image = require('../utils/gifs.utils')
const {uploadFile} = require('../utils/s3.utils')
let Gifs = require('../models/gif.model')

// Location and filename of gif
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'tmp/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
// Max gif upload size
const maxSize = 200 * 1024 * 1024
var upload = multer({ storage: storage, limits: { fileSize: maxSize } })

// Get single gif
router.route('/').get((req, res) => {
    console.log('hey')
})

// Create new gif 
// TODO: Place gif processing and upload on seperate process
router.post('/create', upload.single('file'), async (req, res) => {
    // Get file and store in tmp
    const filename = req.file.filename
    const name = req.body.name
    console.log(filename)

    // Check on file (size, lenght) 
    // TODO: size check, catch err, delete
    let fileDetails =  await image.details(filename)

    // Create small webp 
    // TODO: catch err, delete
    let preview = await image.process(filename)
    
    // Upload files to storage
    await uploadFile(req.file)
    // Write data to database
    // Delete tmp file
    // Responed with 200/gif data
    res.sendStatus(200)
})
// Update gif details
// Delete gif(s)
// List of gifs


module.exports = router