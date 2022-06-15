const Book = require("../models/book");

const NUMBER_OF_BOOKS_TO_SHOW = 6;

const BooksController = {
  Index: (req, res) => {
    const { query } = req;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    Book.find((err, books) => {
      if (err) {
        throw err;
      }
      const filteredBooks = books
        .filter((filteredByDate) => filteredByDate.discussionDate != "TBC")
        .sort((a, b) => {
            let dateA = new Date(a.discussionDate);
            let dateB = new Date(b.discussionDate);
          return dateB - dateA;
        });


      let nextButton = false;
      if (filteredBooks.length > NUMBER_OF_BOOKS_TO_SHOW) {
        nextButton = true;
      }

      res.render("books/index", {
        books: filteredBooks.slice(0, NUMBER_OF_BOOKS_TO_SHOW),
        nextButton: nextButton,
        suggestionsButton: true,
        bookContent:
          books.filter(({ _id }) => _id == query?.selectedBook)?.[0] ||
          books[0] ||
          {},
      });
    });
  },

  // This "more"books page is almost a repetition of the page above but not sure how else to do it with 6 results per page.
  More: (req, res) => {
    const { query } = req;

    Book.find((err, books) => {
      if (err) {
        throw err;
      }
      const filteredBooks = books
        .filter((filteredByDate) => filteredByDate.discussionDate != "TBC")
        .sort((a, b) => {
            let dateA = new Date(a.discussionDate);
            let dateB = new Date(b.discussionDate);
          return dateB - dateA;
        })
        .slice(6, 12);

      res.render("books/more", {
        books: filteredBooks,
        // These booleans control what is shown in the page header
        previousButton: true,
        suggestionsButton: true,
        nextButton: false,
        moreBooks: true,
        bookContent:
          filteredBooks.filter(({ _id }) => _id == query?.selectedBook)?.[0] ||
          filteredBooks[0] ||
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

      res.render("books/suggestions", {
        books: books.filter(
          (filteredByDate) => filteredByDate.discussionDate === "TBC"
        ),
        addBookButton: true,
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

    const bookIdToChangeDate = req.query.selectedBook;

    let selectedDate = new Date(2022, month, 1);

    Book.findOne({ _id: bookIdToChangeDate })
      .exec()
      .then((selectedBook) => {
        selectedBook.discussionDate = selectedDate;
        selectedBook.save();
      })
      .then(() => {
        console.log("saving...");
        res.status(201).redirect("/books/suggestions");
      });
  },

  DeleteBookSuggestion: (req, res) => {
    const bookIdToDelete = req.query.selectedBook;

    Book.findOne({ _id: bookIdToDelete })
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
