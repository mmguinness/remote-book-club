const bookData = require("../models/book");

const HomeController = {
  Index: (req, res) => {
    bookData.find((err, books) => {
      if (err) {
        throw err;
      }
      res.render("home/index", { books: books });
    });
    },
};

module.exports = HomeController;


