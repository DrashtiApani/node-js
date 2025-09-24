const express = require("express");
const routes = express.Router();
const blogModel = require("../model/blogModel");
const blogCtr = require("../controllers/blogCtr");

routes.get("/addBlog", blogCtr.addblog);
routes.post("/insertblog", blogModel.uploads, blogCtr.insertblog);
routes.get("/viewBlog", blogCtr.viewblog);
routes.post("/delete/:id", blogCtr.deleteblog);
routes.get("/edit/:id", blogCtr.editBlogPage);
routes.post("/update/:id", blogModel.uploads, blogCtr.updateBlog);
routes.get("/detail/:id", blogCtr.detailBlog);

module.exports = routes;
