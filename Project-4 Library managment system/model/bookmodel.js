const mongoose = require('mongoose');
const multer  = require('multer');

const path = require('path');

const bookSchema  = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    available: {
        type: Number,
        default: true
    },
    image: {
        type: String,
        required: true
    }
})

const storagebook = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

bookSchema.statics.uploadedImage = multer({ storage: storagebook }).single('image');

const book = mongoose.model('Book', bookSchema);

module.exports = book;