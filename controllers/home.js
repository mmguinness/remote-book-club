const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Remote Book Club" });
  },
};

module.exports = HomeController;
