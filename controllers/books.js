const Book = require("../models/book");

const BooksController = {
  
  Index: (req, res) => {
    Book.find(
      {},
      "message createdAt",
      { sort: { createdAt: -1 } },
      (err, books) => {
        if (err) {
          throw err;
        }
        res.render("books/index", { books: books });
      }
    ).populate("user");
  },

  New: (req, res) => {
    res.render("books/new", {});
  },

  Create: (req, res) => {
    const book = new Book({
      user: req.session.user._id,
      author: req.body.author,
      bookTitle: req.body.bookTitle,
      bookCover: req.body.bookCover,
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