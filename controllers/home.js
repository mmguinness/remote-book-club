const Book = require("../models/book");

const HomeController = {

  Index: (req, res) => {
    Book.find((err, books) => {
      if (err) {
        throw err;
      }

      res.render("home/index", { books: books });
    });
  },
};

module.exports = HomeController;
