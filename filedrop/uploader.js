const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        return callback(null, './images')
    },
    filename: function (req, file, callback) {
        return callback(null, `${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req, file, callback) => {

    const allowedExtensions = ['.jpg', '.png', '.gif', '.jpeg']
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

    const extension = path.extname(file.originalname).toLowerCase()

    if (allowedExtensions.includes(extension) && allowedMimeTypes.includes(file.mimetype))
        return callback(null, true)
    return callback(null, false)
}

const uploader = multer({
    storage, fileFilter, limits : { fileSize: 2 * 1024 * 1024 }
})

module.exports = uploader