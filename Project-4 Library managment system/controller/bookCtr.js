const BookModel = require('../model/bookmodel');

module.exports.book = (req, res) => {
    res.render('addBook');
};

module.exports.addBook = async (req, res) => {
    if (req.file) {
        req.body.image = '/uploads/' + req.file.filename;
    }

    await BookModel.create(req.body);
    res.redirect('/viewBook');
};

module.exports.viewBook = async (req, res) => {
    const books = await BookModel.find();
    res.render('viewBook', { books });
};

module.exports.deleteBook = async (req, res) => {
    await BookModel.findByIdAndDelete(req.params.id);
    res.redirect('/viewBook');
};

module.exports.editBook = async (req, res) => {
    const book = await BookModel.findById(req.params.id);
    res.render('editBook', { book });
};

module.exports.updateBook = async (req, res) => {
    try {
        await BookModel.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/viewBook');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating book");
    }
};
