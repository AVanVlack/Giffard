# Gifard

A gif sharing web app built on node, mongo, and angular.

To run:

1. `npm install`
2. `npm postbuild`
3. start mongodb server
4. `npm start`

## Folder Structure

app             //server side
--common          //app specific lib
--config          //config
--controllers     //route controllers
--models          //db models
--routes          //router
public          //compiled public from build
public-src      //pre compiled public
assets          //all other public assets
--fonts
--img

## Stack

### Front End (built with webpack)
1. Angular
2. Foundations

### Back End
1. Express
2. passport
3. MongoDB w/mongoose
4. imagemagick (optional for image handling)
