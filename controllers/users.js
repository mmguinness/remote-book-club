const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", { message: req.query.message });
  },

  Create: (req, res) => {
    const {
      body: { email, password, userName },
    } = req;

    const user = new User({
      email,
      password,
      userName,
    });
    
    User.findOne({ email: user.email }, function (err, person) {
      if (err) {
        throw err;
      }
      if (person) {
        const message = "This email is already in use, please try again";
        return res.redirect(`/users/new?message=${message}`);
      } else {
        user.save((err) => {
          if (err) {
            throw err;
          }
          req.session.user = user;
          res.status(201).redirect("/");
        });
      }
    });
  },
};

module.exports = UsersController;

