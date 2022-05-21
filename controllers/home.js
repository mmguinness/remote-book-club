const bookData = require("../models/bookData.json");

const HomeController = {
  Index: (req, res) => {
    res.render("home/index", {
      title: "book club",
      books: bookData,
    });
  },
};

module.exports = HomeController;
