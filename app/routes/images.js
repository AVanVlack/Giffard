/*jshint esversion: 6 */
'use strict';
const path = process.cwd();
//const auth = require(path + '/app/config/auth.service.js');
const express = require( 'express' );
const router = express.Router();

module.exports = router
  .get('/', (req,res) => {
    res.send("hello");
  });
