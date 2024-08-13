const express = require('express')
const mongoose = require('mongoose')

// ROUTES
const UserRoutes = require('./routes/users')


// CONFIGURATION
const app = express()
const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/users').then(() => { console.log('MongoDB Connected') })


// MIDDLEWARES
app.use(express.urlencoded({ extended: true }))
app.use('/api/user', UserRoutes)


// SERVER
app.listen(port, () => {
    console.log(`Listening http://127.0.0.1:${port}/`)
})