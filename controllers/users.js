const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", { title: "Book Club", message: req.query.message });
  },

  Create: (req, res) => {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/");
    });
  }
};

module.exports = UsersController;