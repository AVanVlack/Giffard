'use strict';
const Path = require('path');
const gifs = require("../controllers/gifsController");
const express = require( 'express' );
const router = express.Router();
const multer = require('multer')
const upload = multer({dest: Path.join(process.cwd(), 'temp/gifTemp')})

module.exports = router
  .get('/', gifs.listGif)
  .get('/image', gifs.image)
  .post('/upload', upload.single('upload'), gifs.addGif);
