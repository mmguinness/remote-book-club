const bookData = require("../models/bookData.json");

const HistoryController = {
  Index: (req, res) => {
    res.render("history/index", {
      title: "Book Club",
      books: bookData,
    });
  },
};

module.exports = HistoryController;
