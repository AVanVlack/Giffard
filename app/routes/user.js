/*jshint esversion: 6 */
'use strict';
const path = process.cwd();
const user = require(path + '/app/controllers/userController.js');
const express = require( 'express' );
const router = express.Router();
const auth = require(path + '/app/config/auth.service.js');

module.exports = router
  .get('/hello', (req, res) => res.send("hello"))
  .get('/:id', auth.isAuthenticated, (req,res) => {
    res.json(req.user.github);
  })
