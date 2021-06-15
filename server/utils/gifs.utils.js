const fs = require('fs');
const { resolve } = require('path');
const gm = require('gm').subClass({imageMagick: true});

let image = {}

// Remove data from original gif and create preview webp.
image.process = function(file){
    return new Promise((resolve, reject) => {
        gm(file.path).resize(300, 300).compress('WEBP').noProfile().write('tmp/' + file.filename + '.webp', (err) => {
            if (err) reject(err)
            else resolve({path: 'tmp/' + file.filename + '.webp', filename: file.filename + '.webp'}) 
        })
    })
    
}

// Return size details about gif
image.details = function(file){
    return new Promise((resolve, reject) => {
        gm(file.path).size((err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

module.exports = image