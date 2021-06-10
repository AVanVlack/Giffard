const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const dbUri = process.env.DB_URI
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const port = process.env.PORT || 5000

// Database Setup
mongoose.connect(dbUri, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
    user: dbUser,
    pass: dbPass
 });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected to MongoDB Database");
});

app.use(cors())
app.use(morgan('dev')) // TODO: set logging mode with env

// Start Server
app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`)
})