const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

// ROUTES

const URLRouter = require('./routes/urls')
const AuthRouter = require('./routes/auth')
const ProtectedRouter = require('./routes/protected')

// MIDDLESWARES

const { handleUserValidation, handleAuthorization } = require('./middlewares/auth')

// CONFIGURATION

const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/clipurl").then(() => {
    console.log("MongoDB Connected")
}).catch((err) => { console.log("MongoDB Failed") })

// VIEWS

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

// MIDDLEWARES

app.use('/static', express.static('static'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(handleUserValidation())

// ROUTES - MIDDLEWARES 

app.use('/', AuthRouter)
app.use('/', handleAuthorization(['member']), ProtectedRouter)
app.use('/api/url', handleAuthorization(['member']), URLRouter)

// SERVER

app.listen(3000, () => {
    console.log('Listening On : http://127.0.0.1:3000')
})