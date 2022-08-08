require("dotenv").config();
const path = require("path");
const express = require("express");
const createError = require("http-errors");
const app = express();
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const methodOverride = require("method-override");
const booksRouter = require("./routes/books");
const sessionsRouter = require("./routes/sessions");
const usersRouter = require("./routes/users");
const hbshelpers = require("handlebars-helpers")();
const hbs = require("hbs");
const User = require("./models/user");

hbs.registerHelper(hbshelpers);

// view engine setup
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// hbs register helpers and partials
hbs.registerPartials(__dirname + "/views/partials");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.json());

// app.use(
//   session({
//     key: "user_sid",
//     secret: "super_secret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 600000,
//     },
//   })
// );

// app.use(async function (req, res, next) {
//   if (req.session.user) {
//     const globalUser = await User.findById(req.session.user._id).exec();
//     res.locals.globalUser = globalUser;
//   }
//   res.locals.session = req.session;
//   next();
// });

// // clear the cookies after user logs out
// app.use((req, res, next) => {
//   if (req.cookies.user_sid && !req.session.user) {
//     res.clearCookie("user_sid");
//   }
//   next();
// });

// // middleware function to check for logged-in users
// const sessionChecker = (req, res, next) => {
//   if (!req.session.user && !req.cookies.user_sid) {
//     res.redirect("/sessions/new");
//   } else {
//     next();
//   }
// };

// route setup
app.use("/", booksRouter);
app.use("/sessions", sessionsRouter);
app.use("/users", usersRouter);

app.use(express.static(__dirname + "/images"));
app.use("/bulma", express.static(__dirname + "/node_modules/bulma/css/"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// hbs helpers and partials
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("getCurrentMonth", () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  return months[d.getMonth()];
});

// An arrow function does not create its own this context, which is required here.
hbs.registerHelper("getSelectedMonth", function (month) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[month.getMonth()];
});

module.exports = app;
