const Book = require("../models/book");

const NUMBER_OF_BOOKS_TO_SHOW = 6;

const BooksController = {
  Index: (req, res) => {
    const { query } = req;

    Book.find((err, books) => {
      if (err) {
        throw err;
      }
      const filteredBooks = books.filter(
        (filteredByDate) => filteredByDate.discussionDate != "TBC"
      );
      let suggestionsButton = true;
      let nextButton = false;
      if (filteredBooks.length > NUMBER_OF_BOOKS_TO_SHOW) {
        nextButton = true;
      }

      res.render("books/index", {
        books: filteredBooks.slice(0, NUMBER_OF_BOOKS_TO_SHOW),
        nextButton: nextButton,
        suggestionsButton: suggestionsButton,
        monthIndex: filteredBooks.length,
        bookContent:
          books.filter(({ _id }) => _id == query?.selectedBook)?.[0] ||
          books[0] ||
          {},
      });
    });
  },

  More: (req, res) => {
    const { query } = req;

    Book.find((err, books) => {
      if (err) {
        throw err;
      }
      const filteredBooks = books
        .filter((filteredByDate) => filteredByDate.discussionDate != "TBC")
        .slice(6, 12);

      let previousButton = true;
      let nextButton = false;
      let suggestionsButton = true;

      res.render("books/more", {
        books: filteredBooks,
        monthIndex: filteredBooks.length + NUMBER_OF_BOOKS_TO_SHOW,
        previousButton: previousButton,
        suggestionsButton: suggestionsButton,
        nextButton: nextButton,
        bookContent:
          filteredBooks.filter(({ _id }) => _id == query?.selectedBook)?.[0] ||
          books[NUMBER_OF_BOOKS_TO_SHOW] ||
          {},
      });
    });
  },

  New: (req, res) => {
    res.render("books/new", {
       message: req.query.message,  
       showUser: true,
      });
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
        console.log(err);
      }
      if (existingBook) {
        const message =
          "This title is already in use, please enter a new title";
        console.log(message);
        return res.redirect(`/books/new?message=${message}`);
      } else {
        book.save((err) => {
          if (err) {
            throw err;
          }
          req.session.user = book;
          console.log("saving...");
          res.status(201).redirect("/books/suggestions");
        });
      }
    });
  },

  Suggestion: (req, res) => {
    const { query } = req;

    Book.find((err, books) => {
      if (err) {
        throw err;
      }

      let addBookButton = true; 

      res.render("books/suggestions", {
        books: books.filter(
          (filteredByDate) => filteredByDate.discussionDate === "TBC"
        ),
        addBookButton: addBookButton,
        bookContent:
          books.filter(({ _id }) => _id == query?.selectedBook)?.[0] ||
          books.filter(
            (filteredByDate) => filteredByDate.discussionDate === "TBC"
          )?.[0] ||
          {},
      });
    });
  },

  // Update a book from suggestion to selected
  AddBookSelectionDate: (req, res) => {
    const {
      body: { month },
    } = req;

    // not sure how to find the correct the id or bookTitle
    // the rest is working to set the date when I give the bookTitle example below is Sherlock Holmes
    Book.findOne({ bookTitle: "Sherlock Holmes" })
      .exec()
      .then((selectedBook) => {
        selectedBook.discussionDate = month;
        selectedBook.save();
      })
      .then(() => {
        console.log("saving...");
        res.status(201).redirect("/books/suggestions");
      });
  },

  // Delete a book from suggestions
  DeleteBookSuggestion: (req, res) => {

    // not sure how to find the correct the id or bookTitle to delete
    // the rest is working to delete a book, works when I give the bookTitle

      Book.findOne({ bookTitle: "Test Title 2" })
        .exec()
        .then((selectedBook) => {
          selectedBook.deleteOne();
          selectedBook.save();
        })
        .then(() => {
          console.log("saving...");
          res.status(201).redirect("/books/suggestions");
    });
  },

};

module.exports = BooksController;
