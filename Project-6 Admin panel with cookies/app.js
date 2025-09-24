const express = require('express');
const path = require('path');
const port = 8099;
const app = express();


app.set('view engine', 'ejs');
const db = require('./config/db');
const Admin = require('./model/adminModel')
const cookieParser = require('cookie-parser');
app.use(cookieParser())

app.use(express.static(path.join(__dirname,'assets'))) // css add 
app.use(express.urlencoded());

app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use('/',require('./routes/index'));

app.listen(port,(err) => { 
    err? console.log(err) : console.log(`Server is running on port ${port}`);
})