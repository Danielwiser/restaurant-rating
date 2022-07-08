const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv') // this will have our config and our variables
const morgan = require('morgan') // we just want morgan so that we there's a request of any kind it shows down in the console
const exphbs = require('express-handlebars')
const { engine } = require( 'express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')
const bodyParser = require("body-parser")




// load config
dotenv.config({ path: './config/config.env'}) // inside this directory is where we will put our global variables

// passport config 
require('./config/passport')(passport)


connectDB()
//initialize our app
const app = express()


// body parser
// this will help get data from req.body
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

// logging
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false, // means dont save  a session until something is modified
    saveUninitialized: false, // to false means, dont create a sessions ubtil soemthing is stored
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}), // created to prevent the bookingout after refresh so that the user stays logged. the data is stored in mongo
  }))


// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', require('./routes/index'))
app.use('/', require('./routes/auth'))
app.use('/restaurants', require('./routes/restaurants'))

const PORT = process.env.PORT || 3000


app.listen(PORT, 
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
 )
 