const express = require('express')
const { handleHome } = require('../controllers/views')

const router = express.Router()

router.route('/').get(handleHome)

module.exports = router
