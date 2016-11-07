'use strict'
const path = process.cwd();
const multer  = require('multer');
const upload = multer({ dest: path + '/data/uploadTemp/' });
const gm = require('gm').subClass({imageMagick: true});
const framePath = path + "/data/frame/";
const Gif = require("../models/gifs");

// Add gif from upload.
exports.addGif = function(req, res) {
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
}

// List gifs. from param
exports.listGif = function(req, res) {
  Gif.find((err, gifs) => {
    if(err){
      res.send(404);
    }
    res.send(gifs);
  });
}

// Delete gif
exports.removeGif = function(req, res) {

};

// Update gif data
exports.updateGif = function(req, res) {

};

exports.image = function(req, res) {

};
