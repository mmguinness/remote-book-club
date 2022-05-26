const Book = require("../models/book");

const BooksController = {
  
  Index: (req, res) => {
    Book.find((err, books) => {
      if (err) {
        throw err;
      }

      res.render("books/index", { books: books });
    });
  },

  New: (req, res) => {
    res.render("books/new", {});
  },

  Create: (req, res) => {
    const book = new Book({
      user: req.session.user._id,
      author: req.body.author,
      bookTitle: req.body.bookTitle,
      description: req.body.description,
      reason: req.body.reason,
    });
    Book.findOne({ bookTitle: book.bookTitle }, function (err, item) {
      if (err) {
        throw err;
      }
      if (item) {
        const message = "This title is already in use, please enter a new title";
        return res.redirect(`/books/new?message=${message}`);
      } else {
        book.save((err) => {
          if (err) {
            throw err;
          }
          req.session.user = book;
          res.status(201).redirect("/books");
        });
      }
    });
  },
};

module.exports = BooksController;