const Book = require("../models/book");

const HomeController = {
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

      res.render("books/index", {
        homePage: true,
        bookContent:
        // Displays only the most recently selected book
          booksOrderedByDate[0] ||
          {},
      });
    });
  },
};

module.exports = HomeController;
