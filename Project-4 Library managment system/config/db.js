const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/bookManagment")

const db = mongoose.connection;

db.once('open',(err)=>{
    if (err) {
        console.log("Error in database connection");
        return;
    }
    console.log("Database connected successfully");
})