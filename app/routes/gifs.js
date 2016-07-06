'use strict';
const path = process.cwd();
const multer  = require('multer');
const upload = multer({ dest: path + '/data/gifs/' });
const gm = require('gm').subClass({imageMagick: true});
const framePath = path + "/data/frame/";
const express = require( 'express' );
const router = express.Router();
const Gif = require("../models/gifs");

module.exports = router
  .post('/upload', upload.single('gif'), function(req, res){
    gm(req.file.path)
      .selectFrame(1)
      .write(framePath + req.file.filename, (err) => {
        if (err) console.log(err);
    });
    console.log(req.body);
    var newGif = new Gif();

    newGif.title = req.body.title;
    newGif.discription = req.body.discription;
    newGif.filename = req.file.filename;

    newGif.save((err) => {
      if (err) {
        throw err;
      }
    });
    res.sendStatus(200);
  });
