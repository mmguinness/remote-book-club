const Book = require("../models/book");

const NUMBER_OF_BOOKS_TO_SHOW = 6;

const BooksController = {
  Index: (req, res) => {
    const { query } = req;
    console.log({ query });

    Book.find((err, books) => {
      if (err) {
        throw err;
      }
      res.render("books/index", {
        books: books.slice(0, NUMBER_OF_BOOKS_TO_SHOW),
        bookContent:
          books.filter(({ _id }) => _id == query?.selectedBook)?.[0] ||
          books[0] ||
          {},
      });
    });
  },

  New: (req, res) => {
    res.render("books/new", {});
  },

  Create: (req, res) => {
    const {
      body: { author, bookTitle, description, reason },
    } = req;

    const book = new Book({
      user: req.session.user._id,
      author,
      bookTitle,
      description,
      reason,
    });

    Book.findOne({ bookTitle }, function (err, existingBook) {
      if (err) {
        throw err;
      }
      if (existingBook) {
        const message =
          "This title is already in use, please enter a new title";
        return res.redirect(`/books/new?message=${message}`);
      } else {
        book.save((err) => {
          if (err) {
            throw err;
          }
          req.session.user = book;
          console.log("saving...");
          res.status(201).redirect("/books");
        });
      }
    });
  },

  Suggestion: (req, res) => {
    const { query } = req;
    console.log({ query });
    
    Book.find((err, books) => {
      if (err) {
        throw err;
      }
      res.render("books/suggestions", {
        books: books.slice(0, NUMBER_OF_BOOKS_TO_SHOW),
        moreBooks: books.slice(
          NUMBER_OF_BOOKS_TO_SHOW,
          NUMBER_OF_BOOKS_TO_SHOW + 5
        ),
        bookContent:
          books.filter(({ _id }) => _id == query?.selectedBook)?.[0] ||
          books[0] ||
          {},
      });
      // console.log({ bookContent });
    });

    //   res.render("books/suggestions", { 
    //     books: books,
    //     booksOnView:
    //     books.filter(book => book.discussionDate == "TBC"),

  },
};

module.exports = BooksController;
