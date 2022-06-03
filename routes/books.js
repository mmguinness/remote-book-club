const express = require("express");
const router = express.Router();

const BooksController = require("../controllers/books");

router.get("/", BooksController.Index);
router.post("/", BooksController.Create);
router.get("/new", BooksController.New);
router.get("/suggestions", BooksController.Suggestion);
// updating book from suggestions to selected
// router.patch("/suggestions/", BooksController.Selected);
// deleting book from suggestions 
// router.delete("/suggestions/", BooksController.Delete);

module.exports = router;
