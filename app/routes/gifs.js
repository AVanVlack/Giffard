'use strict';
const gifs = require("../controllers/gifsController");
const express = require( 'express' );
const router = express.Router();

module.exports = router
  .get('/', gifs.listGif)
  .get('/image', gifs.image)
  .post('/upload', gifs.addGif);
