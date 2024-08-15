const fs = require('fs')
const path = require('path')
const { createSlug } = require('../utils/helpers')

const renderPublish = (req, res) => {
    res.render('publish', { flash: req.flash('flash') })
}

const handlePublish = (req, res) => {
    const languages = ['html', 'css', 'javascript', 'python', 'sql', 'react']
    const { heading, language, snippet } = req.body

    if (!heading || heading.trim().length < 10) {
        req.flash('flash', { type: 'info', text: 'Invalid Heading. Minimum 10 Characters.' })
        return res.redirect('/publish')
    }

    if (!language || !languages.includes(language)) {
        req.flash('flash', { type: 'info', text: 'Invalid Language. Please Select Valid Ones.' })
        return res.redirect('/publish')
    }

    if (!snippet || snippet.trim().length < 100) {
        req.flash('flash', { type: 'info', text: 'Invalid Snippet. Minimum 100 Characters.' })
        return res.redirect('/publish')
    }

    const json = {
        heading,
        language,
        snippet,
        likes: {},
    }

    const filename = path.join(__dirname, '../json', `${Date.now()}-${createSlug(heading)}.json`)

    fs.writeFile(filename, JSON.stringify(json), (err) => {
        if (err) {
            console.error('Error writing file:', err)
            req.flash('flash', { type: 'error', text: 'Error saving your data. Please try again.' })
            return res.redirect('/publish')
        }
        console.log('File saved:', filename)
        req.flash('flash', { type: 'success', text: 'Snippet Will Be Published After Verification.' })
        res.redirect('/publish')
    })
}

module.exports = {
    renderPublish, handlePublish
}