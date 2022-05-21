const express = require("express");
const router = express.Router();

const HistoryController = require("../controllers/history");

router.get("/", HistoryController.Index);

module.exports = router;
