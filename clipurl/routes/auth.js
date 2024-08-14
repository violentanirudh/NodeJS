const express = require('express');
const { handleRedirection, handleSignIn, handleSignUp } = require('../controllers/views');

const router = express.Router();

router.route('/signin')
    .get(handleSignIn)
    .post(handleSignIn);

router.route('/signup')
    .get(handleSignUp)
    .post(handleSignUp);

router.get('/logout', (req, res) => {
    req.user = null
    res.clearCookie('user');
    res.status(200).redirect('/signin');
});

router.route('/:alias').get(handleRedirection);

module.exports = router;
