const express = require("express");
const router = express.Router();

const BooksController = require("../controllers/books");

router.get("/", BooksController.Index);
router.post("/", BooksController.Create);
router.get("/new", BooksController.New);

module.exports = router;
