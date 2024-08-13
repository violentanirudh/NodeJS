const express = require('express')
const mongoose = require('mongoose')

// ROUTES

const URLRouter = require('./routes/urls')

// CONFIGURATION

const app = express()
mongoose.connect("mongodb://127.0.0.1:27017/clipurl").then(() => {
    console.log("MongoDB Connected")
}).catch((err) => { console.log("MongoDB Failed") })


// MIDDLEWARES

app.use(express.urlencoded({ extended: true }))
app.use('/api/url', URLRouter)


// SERVER

app.listen(3000, () => {
    console.log('Listening On : http://127.0.0.1:3000')
})