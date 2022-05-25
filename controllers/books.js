const Book = require("../models/book");

const BooksController = {
  Index: (req, res) => {

    Book.find({}, "bookCover author bookTitle", (err, books) => {
      if (err) {
        throw err;
      }
      res.render("books/index", { books: books });
    })
      .populate("bookCover")
      .populate("author")
      .populate("bookTitle");
      },


  New: (req, res) => {
    res.render("books/new", {});
  },

  Create: (req, res) => {
    const book = new Book({
      bookTitle: req.body.bookTitle,
      author: req.body.author,
      bookCover: req.body.bookCover,
    });
    book.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/books");
    });
  },

};

module.exports = BooksController;