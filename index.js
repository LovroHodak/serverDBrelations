require('dotenv').config()
const express = require('express')
const router = express()
const port = process.env.PORT
const logger = require('morgan');
require('./config/db.config')
const mongoose = require('mongoose');

//this is for req.body shortange stuff
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))

router.use(logger('dev'));


const hbs = require('hbs')

const bbRoutes = require('./routes/bb.routes')

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

router.use(session({
  secret: 'LovroDBRelSecret',
  saveUninitialized: false,
  resave: false,
  cookie: {
      maxAge: 24*60*60*1000
  },
  store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24*60*60
  })
}));

router.use('/', bbRoutes)
router.use(express.static(__dirname + '/public'))


router.set('view engine', 'hbs')
router.set('views', __dirname + '/views')


router.listen(port, () => {
    console.log(`Example Lovro app listening at http://localhost:${port}`)
    console.log(__dirname)
  })