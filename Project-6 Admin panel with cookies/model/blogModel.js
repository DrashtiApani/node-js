const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// Upload folder path (inside project root)
const IMAGE_PATH = '/uploads/blogimages';

// Blog Schema
const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
});

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', IMAGE_PATH));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Multer middleware (single file upload)
blogSchema.statics.uploads = multer({ storage: storage }).single('image');

// Export imagePath so controller can use it
blogSchema.statics.imagePath = IMAGE_PATH;

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;
