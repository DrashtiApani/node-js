const express = require("express");
const port = 8000;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const voterCheck = require("./middleware/age");

app.get("/", (req, res) => {
    return res.render("home");
});

app.get("/vision", (req, res) => {
    return res.render("about"); 
});

app.get("/news", voterCheck, (req, res) => {
    return res.render("blog");
});

app.get("/candidates", (req, res) => {
    return res.render("product"); 
});

app.get("/contact", (req, res) => {
    return res.render("contact");
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`✅ Election Portal running on port ${port}`);
});
