const bookData = require("../models/bookData.json");

const HomeController = {
  Index: (req, res) => {
    res.render("home/index", {
      title: "Book Club",
      books: bookData,
    });
  },
};

module.exports = HomeController;
