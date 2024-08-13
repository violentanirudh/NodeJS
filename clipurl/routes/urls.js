const express = require('express')
const router = express.Router()

const { handleCreateURL, handleDeleteURLByAlias, handleGetURL, handleGetURLByAlias } = require('../controllers/urls')

router.route('/')
    .get(handleGetURL)
    .post(handleCreateURL)

router.route('/:alias')
    .get(handleGetURLByAlias)
    .delete(handleDeleteURLByAlias)

module.exports = router