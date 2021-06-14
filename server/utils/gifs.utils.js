const fs = require('fs');
const { resolve } = require('path');
const gm = require('gm').subClass({imageMagick: true});

let image = {}

// Remove data from original gif and create preview webp.
image.process = function(filename){
    return new Promise((resolve, reject) => {
        gm('tmp/' + filename).resize(300, 300).compress('WEBP').noProfile().write('tmp/' + filename + '.webp', (err) => {
            if (err) reject(err)
            else resolve()
        })
    })
    
}

// Return size details about gif
image.details = function(filename){
    return new Promise((resolve, reject) => {
        gm('tmp/' + filename).size((err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

module.exports = image