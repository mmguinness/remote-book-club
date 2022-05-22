const bookData = require("../models/book");

const HomeController = {
  Index: (req, res) => {
    bookData.find((bookData) => {
      res.render("home/index", { title: "Book Club", books: bookData });
    });
    },
};

module.exports = HomeController;
