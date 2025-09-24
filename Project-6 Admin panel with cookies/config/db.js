const express = require('express');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/cookies')
mongoose.connect('mongodb+srv://DrashtiApani:DrashtiApani@cluster0.cwgzcyd.mongodb.net/cookies')



const db = mongoose.connection;

db.once('open',(err) => {       
    if(err){
        console.log(err);
    }
    console.log('Connected to Database');
    
})
module.exports = db