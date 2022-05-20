// const Book = require("../models/book");

const HomeController = {
  Index: (req, res) => {
    res.render("home/index", {
      title: "RBC",
      books: [
        {
          name: "Girl",
          author_name: "Bernardine Evaristo",
          image: "GirlWomanOther.png",
        },
        {
          name: "Woman",
          author_name: "Bernardine Evaristo",
          image: "GirlWomanOther.png",
        },
        {
          name: "Girl, Woman, Other",
          author_name: "Bernardine Evaristo",
          image: "/GirlWomanOther.png",
        },
      ],
    });
  },
};

module.exports = HomeController;
