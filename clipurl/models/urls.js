const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    alias: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const urls = mongoose.model('url', urlSchema) 

module.exports = urls