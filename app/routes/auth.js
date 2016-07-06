
'use strict';
const path = process.cwd();
const auth = require(path + '/app/config/auth.service.js');
const express = require( 'express' );
const router = express.Router();

const passport = require('passport');

//require('./app/config/passport')(passport);

module.exports = router
  .get('/github', passport.authenticate('github'))
  .get('/github/callback', passport.authenticate('github', {failureRedirect: '/login'}),
  auth.setTokenCookie);
