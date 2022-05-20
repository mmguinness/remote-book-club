// const Book = require("../models/book");

const HomeController = {
  Index: (req, res) => {
    res.render("home/index", {
      title: "Remote Book Club",
      books: [
        {
          name: "Girl, Woman, Other",
          author_name: "Bernardine Evaristo",
          image: "GirlWomanOther.png",
          discussion_date: "Sept 2021",
          description: "Girl, Woman, Other follows the lives and struggles of twelve very different characters. Mostly women, black and British, they tell the stories of their families, friends and lovers, across the country and through the years.",
        },
        {
          name: "Woman World",
          author_name: "Bernardine Evaristo",
          image: "/WomanWorld.png",
        },
        {
          name: "Diary of a Young Naturalist",
          author_name: "Dara MacAnulty",
          image: "YoungNaturalist.png",
        },
        {
          name: "Exciting Times",
          author_name: "Naoise Dolan",
          image: "ExcitingTimes.png",
        },
        {
          name: "Beautiful World, Where are you",
          author_name: "Sally Rooney",
          image: "/BeautifulWorld.png",
        },
        {
          name: "Heart's Invisible Furies",
          author_name: "xx",
          image: "Invisible.png",
        },
        {
          name: "The Summer I robbed a bank",
          author_name: "David O'Doherty",
          image: "/Summer.png",
        },
        {
          name: "Girl, Woman, Other",
          author_name: "Bernardine Evaristo",
          image: "GirlWomanOther.png",
        },
        {
          name: "Woman World",
          author_name: "Bernardine Evaristo",
          image: "/WomanWorld.png",
        },
      ],
    });
  },
};

module.exports = HomeController;
