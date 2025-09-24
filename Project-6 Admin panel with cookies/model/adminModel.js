const mongoose = require('mongoose');
const uploadImage = '/uploads'
const multer = require('multer')
const path = require('path')
const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    qualification: {
        type: Array,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    create_date : {
        type: String,
        required: true
    },
    update_date: {
        type: String,
        required: true
    }
    
})

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,path.join(__dirname,'..',uploadImage));
    },
    filename : (req,file,cb) => {
        cb(null,file.fieldname + '-' + Date.now())
    }
})

adminSchema.statics.adminUpload = multer({storage:storage}).single('profile');
adminSchema.statics.imagePath = uploadImage

const Admin = mongoose.model('admin',adminSchema)

module.exports = Admin