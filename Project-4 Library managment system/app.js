const express = require('express');
const path = require('path');
const port = 8010;
const app = express();

const db = require('./config/db'); 


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const bookRoutes = require('./routes/index');
app.use('/', bookRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
