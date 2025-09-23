const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/Retrium")

const db = mongoose.connection;

db.once('open',(err)=>{
    if(err){
        console.log("Error in connecting to database");
        return false;
    }
    console.log("Connected to database");
})

module.exports = db;