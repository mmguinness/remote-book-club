const Book = require("../models/book");

const HomeController = {
  Index: (req, res) => {
    Book.find(
      {},
      "message createdAt",
      { sort: { createdAt: -1 } },
      (err, books) => {
        if (err) {
          throw err;
        }
        res.render("home/index", { books: books });
      }
    ).populate("user");
  },
};

module.exports = HomeController;
