const Book = require("../models/book");
require

require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const NUMBER_OF_BOOKS_TO_SHOW = 6;

const BooksController = {
  Index: (req, res) => {
    const { query } = req;

    Book.find((err, books) => {
      if (err) {
        throw err;
      }

      const booksOrderedByDate = books
        .filter((ordereredByDate) => ordereredByDate.discussionDate != "TBC")
        .sort((a, b) => {
          let dateA = new Date(a.discussionDate);
          let dateB = new Date(b.discussionDate);
          return dateB - dateA;
        });

      const showNextButton =
        booksOrderedByDate.length > NUMBER_OF_BOOKS_TO_SHOW;

      res.render("books/index", {
        books: booksOrderedByDate.slice(0, NUMBER_OF_BOOKS_TO_SHOW),
        nextButton: showNextButton,
        suggestionsButton: true,
        bookContent:
          books.filter(({ _id }) => _id == query?.selectedBook)?.[0] ||
          booksOrderedByDate[0] ||
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

      const getBooksOrderedByDate = ({
        unOrderedBooks,
        startIndex,
        pageSize,
      }) =>
        unOrderedBooks
          .filter((ordereredByDate) => ordereredByDate.discussionDate != "TBC")
          .sort((a, b) => {
            let dateA = new Date(a.discussionDate);
            let dateB = new Date(b.discussionDate);
            return dateB - dateA;
          })
          .slice(startIndex, startIndex + pageSize);

      const booksOrderedByDate = getBooksOrderedByDate({
        unOrderedBooks: books,
        startIndex: NUMBER_OF_BOOKS_TO_SHOW,
        pageSize: NUMBER_OF_BOOKS_TO_SHOW,
      });

      res.render("books/index", {
        books: booksOrderedByDate,
        previousButton: true,
        suggestionsButton: true,
        nextButton: false,
        moreBooks: true,
        bookContent:
          booksOrderedByDate.filter(
            ({ _id }) => _id == query?.selectedBook
          )?.[0] ||
          booksOrderedByDate[0] ||
          {},
      });
    });
  },

  New: (req, res) => {
    res.render("books/new", {
      message: req.query.message,
      addNewBook: true,
      showUser: true,
    });
  },

  Create: (req, res) => {
    const {
      body: { author, bookTitle, description, reason, bookCover },
    } = req;

    const book = new Book({
      user: req.session.user.userName,
      author,
      bookTitle,
      description,
      reason,
      bookCover,
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

      res.render("books/index", {
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

  AddBookSelectionDate: (req, res) => {
    const {
      body: { month },
    } = req;

    const bookIdToChangeDate = req.query.selectedBook;
    let selectedDate = new Date(2022, month, 1);

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

    const selectedMonth = months[month];

    Book.findOne({ _id: bookIdToChangeDate })
      .exec()
      .then((selectedBook) => {
        selectedBook.discussionDate = selectedDate;
        selectedBook.save();

         const msg = {
           to: "mcguinnessmarie@gmail.com",
           from: "mcguinnessmarie@gmail.com",
           subject: `Remote book club - ${selectedMonth} update`,
           html: `
            <p>
              Hi guys! The book selected for ${selectedMonth} is ${selectedBook.bookTitle} by ${selectedBook.author}.
            </p>
            <br>
            <p>
              Happy reading!
            </p>`,
         };
         sgMail.send(msg);
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

  ReadingList: (req, res) => {
    const { query } = req;

    Book.find((err, books) => {
      if (err) {
        throw err;
      }

      const booksOrderedByDate = books
        .filter((ordereredByDate) => ordereredByDate.discussionDate != "TBC")
        .sort((a, b) => {
          let dateA = new Date(a.discussionDate);
          let dateB = new Date(b.discussionDate);
          return dateA - dateB;
        });

      res.render("books/readinglist", {
        books: booksOrderedByDate,
        readingList: true,
        bookContent:
          books.filter(({ _id }) => _id == query?.selectedBook)?.[0] || {},
      });
    });
  },
};

module.exports = BooksController;
