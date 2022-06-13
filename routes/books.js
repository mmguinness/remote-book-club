const express = require("express");
const router = express.Router();

const BooksController = require("../controllers/books");

router.get("/", BooksController.Index);
router.get("/more", BooksController.More);
router.post("/", BooksController.Create);
router.get("/new", BooksController.New);

router.get("/suggestions", BooksController.Suggestion);
router.post("/suggestions", BooksController.AddBookSelectionDate);
router.post("/delete", BooksController.DeleteBookSuggestion);


module.exports = router;
