/*jshint esversion: 6 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Gif = new Schema({
	title: String,
  discription: String,
  categorie: String,
  tags: [String],
  created: Date,
  filename: String,
  uploader: Schema.Types.ObjectId,
})

module.exports = mongoose.model('Gif', Gif);
