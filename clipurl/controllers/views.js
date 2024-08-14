const urls = require('../models/urls')
const Users = require('../models/users')
const validator = require('validator')
const bcrypt = require('bcrypt')
const { generateJWT } = require('../services/auth')

const handleHome = async (req, res) => {
    const allURLs = await urls.find({ user: req.user.id })
    res.render('index', {
        urls: allURLs
    })
}

const handleRedirection = async (req, res) => {
    const alias = req.params.alias
    if ( !alias )
        return res.status(404).render('404')

    const data = await urls.findOneAndUpdate({ alias }, { $inc: { clicks: 1 } }, { new: true })
    
    if ( data )
        return res.status(301).redirect(data.url)
    return res.status(404).render('404')
}

const handleSignIn = async (req, res) => {

    if (req.user) 
        return res.status(302).redirect('/')

    if (req.method === 'GET')
        return res.render('signin')

    const { email, password } = req.body

    if ( !email || !password )
        return res.status(400).redirect('./signin')
    
    const user = await Users.findOne({ email })
    
    if (user && bcrypt.compare(password, user.password)) {
        const token = await generateJWT({
            id: user._id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            api: false
        })
        res.cookie('user', token)
        return res.status(200).redirect('/')
    }

    return res.status(400).json({ status: 'error', data: 'No User Found' })
}

const handleSignUp = async (req, res) => {

    if (req.user) 
        return res.status(302).redirect('/')

    if (req.method === 'GET')
        return res.render('signup')

    const { name, email, password } = req.body

    if ( !name )
        return res.status(400).redirect('./signup')

    if (!validator.isEmail(email))
        return res.status(400).redirect('./signup')

    if (!validator.isStrongPassword(password))
        return res.status(400).redirect('./signup')

    const hashed = await bcrypt.hash(password, 10)

    try {
        const user = await Users.create({ name, email, password: hashed })
        return res.status(201).redirect('./signin')
    } catch {
        return res.status(400).redirect('./signup')
    }
}

module.exports = {
    handleHome,
    handleRedirection,
    handleSignIn,
    handleSignUp
}