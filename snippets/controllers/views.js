const renderHome = async (req, res) => {
    return res.render('home')
}

const renderSignIn = (req, res) => {
    if (req.user) return res.redirect('/')
    return res.render('signin', { flash: req.flash('flash') })
}

const renderSignUp = (req, res) => {
    if (req.user) return res.redirect('/')
    return res.render('signup', { flash: req.flash('flash') })
}

module.exports = {
    renderHome,
    renderSignIn,
    renderSignUp
}