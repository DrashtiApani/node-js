const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const uploadFolder = path.join(__dirname, '..', 'uploads');

const blogSchema = new mongoose.Schema({
    profile: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: [String], required: true } 
});

// Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

blogSchema.statics.uploadImage = multer({ storage: storage }).single('profile');

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
