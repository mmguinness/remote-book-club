const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Book Club" });
  },
};

module.exports = HomeController;
