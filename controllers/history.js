const bookData = require("../models/bookData.json");

const HistoryController = {
  Index: (req, res) => {
    res.render("history/index", {
      title: "book club",
      books: bookData,
    });
  },
};

module.exports = HistoryController;
