const blogModel = require("../model/blogModel");
const fs = require("fs");
const path = require("path");

module.exports.addblog = (req, res) => {
    try {
        let admin = req.cookies.admin;
        res.render("blog/addBlog", { admin });
    } catch (err) {
        console.log(err);
    }
};


module.exports.insertblog = async (req, res) => {
    try {
        console.log("image uploaded", req.file);

        if (req.file) {
            req.body.image = "/uploads/blogimages/" + req.file.filename;   
        } else {
            req.body.image = "";
            console.log("No image uploaded");
        }

        await blogModel.create(req.body);
        console.log("✅ Blog Inserted Successfully");
        res.redirect("/blog/viewBlog");
    } catch (err) {
        console.log(err);
    }
};

module.exports.viewblog = async (req, res) => {
    try {
        let admin = req.cookies.admin;
        const data = await blogModel.find();
        res.render("blog/viewBlog", { admin, data });
    } catch (err) {
        console.log(err);
    }
};


module.exports.deleteblog = async (req, res) => {
    try {
        console.log("Deleting blog id:", req.params.id);

        let blog = await blogModel.findById(req.params.id);
        if (blog && blog.image) {
            try {
              
                let imagePath = path.join(__dirname, "..", blog.image);
                fs.unlinkSync(imagePath);
                console.log("Image deleted from server");
            } catch (err) {
                console.log("Image not found on server");
            }
        }

        let deletedBlog = await blogModel.findByIdAndDelete(req.params.id);
        if (deletedBlog) {
            console.log("✅ Blog Deleted Successfully");
        } else {
            console.log("Blog not deleted");
        }
        return res.redirect("/blog/viewBlog");
    } catch (err) {
        console.log(err);
        return res.redirect("/blog/viewBlog");
    }
};

module.exports.editBlogPage = async (req, res) => {
    try {
        let admin = req.cookies.admin;
        let blog = await blogModel.findById(req.params.id);
        res.render("blog/editBlog", { blog, admin });
    } catch (err) {
        console.log("Error in editBlogPage:", err);
        res.redirect("/blog/viewBlog");
    }
};


module.exports.updateBlog = async (req, res) => {
    try {
        let updateData = req.body;   

        if (req.file) {
            updateData.image = "/uploads/blogimages/" + req.file.filename;
        }

        await blogModel.findByIdAndUpdate(req.params.id, updateData);

        console.log("✅ Blog updated successfully");
        res.redirect("/blog/viewBlog");
    } catch (err) {
        console.log("Error in updateBlog:", err);
        res.redirect("/blog/viewBlog");
    }
};

module.exports.detailBlog = async (req, res) => {
    try {
        let admin = req.cookies.admin;
        let blog = await blogModel.findById(req.params.id);
        res.render("blog/detailBlog", { blog, admin });
    } catch (err) {
        console.log("Error in detailBlog:", err);
        res.redirect("/blog/viewBlog");
    }
};
