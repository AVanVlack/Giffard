'use strict'
const path = process.cwd();
const fs = require('fs');
const gm = require('gm').subClass({imageMagick: true});
const framePath = path + "/data/frame/";
const Gif = require("../models/gifs");
const cloudinary = require('cloudinary');
cloudinary.config(require(path + "/app/config/cloudinary"));

// Add gif from upload.
exports.addGif = (req, res) => {
  // gm(req.file.path)
  //   .selectFrame(1)
  //   .write(framePath + req.file.filename, (err) => {
  //     if (err) console.log(err);
  // });

  var buildGif = new Gif();

  buildGif.title = req.body.title;
  buildGif.discription = req.body.discription;
  buildGif.filename = req.file.filename;
  buildGif.tags = req.body.tags;

  cloudinary.uploader.upload(
    req.file.path,
    function(result) {
      buildGif.url = result.url
      buildGif.public_id = result.public_id

      buildGif.save((err,resp) => {
        if (err) {
          throw err;
        }
        res.sendStatus(200);
        fs.unlink(req.file.path, (err) => {
          if (err) throw err;
          console.log('successfully deleted /tmp/hello');
        });
      });

    },
    {
      format: 'gif',
    }
  )

  console.log(req.body);
  console.log(req.file);
};

// List gifs. from param
exports.listGif = (req, res) => {
  Gif.find((err, gifs) => {
    if(err){
      res.send(404);
    }
    res.send(gifs);
  });
}

// Delete gif
exports.removeGif = (req, res) => {

};

// Update gif data
exports.updateGif = (req, res) => {

};

exports.image = (req, res) => {

};
