const express = require('express')
const path = require('path')
const uploader = require('./uploader')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    return res.render('index')
})

app.post('/', uploader.single('image'), (req, res) => {
    return res.redirect('/')
})

app.listen(3000, () => {
    console.log('Listening : http://127.0.0.1:3000')
})