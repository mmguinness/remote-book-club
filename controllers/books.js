const Book = require("../models/book");

const NUMBER_OF_BOOKS_TO_SHOW = 6;

const BooksController = {
  Index: (req, res) => {
    const { query } = req;

    Book.find((err, books) => {
      if (err) {
        throw err;
      }
      const filteredBooks = books
        .filter((filteredByDate) => filteredByDate.discussionDate != "TBC")
        .sort((a, b) => { return b.discussionDate - a.discussionDate});

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

  More: (req, res) => {
    const { query } = req;

    Book.find((err, books) => {
      if (err) {
        throw err;
      }
      const filteredBooks = books
        .filter((filteredByDate) => filteredByDate.discussionDate != "TBC")
        .sort((a, b) => { return b.discussionDate - a.discussionDate})
        .slice(6, 12);

      console.log(filteredBooks);
      
      res.render("books/more", {
        books: filteredBooks,
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

    const bookIdToChangeDate = req.query.selectedBook;
    console.log(bookIdToChangeDate);
    console.log(month);

    // not sure how to find the correct the id or bookTitle
    // the rest is working to set the date when I give the bookTitle example below is Sherlock Holmes
    Book.findOne({ _id: bookIdToChangeDate })
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
    
    const bookIdToDelete = req.query.selectedBook;
    console.log(bookIdToDelete);

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
