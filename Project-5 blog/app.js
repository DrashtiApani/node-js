const express = require('express');
const app = express();
const port = 8022;
const path = require('path');

const db = require('./config/db');
const Blog = require('./model/blogModel');

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'assets')));

// Routes

// Add blog page
app.get('/', (req, res) => {
    res.render('add');
});

// Show all blogs
app.get('/show', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.render('show', { blog: blogs });
    } catch (err) {
        console.log(err);
        res.send('Error fetching blogs');
    }
});

// Add blog form submit
app.post('/formAdd', Blog.uploadImage, async (req, res) => {
    try {
        if (req.file) {
            req.body.profile = '/uploads/' + req.file.filename;
        }
        // If category comes as string, convert to array
        if (typeof req.body.category === 'string') {
            req.body.category = [req.body.category];
        }
        await Blog.create(req.body);
        res.redirect('/show');
    } catch (err) {
        console.log(err);
        res.send('Error adding blog');
    }
});

// Read more page
app.get('/readMore/:id', async (req, res) => {
    try {
        const data = await Blog.findById(req.params.id);
        res.render('readMore', { blog: data });
    } catch (err) {
        console.log(err);
        res.send('Blog not found');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
