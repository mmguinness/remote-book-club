const express = require("express");
const router = express.Router();

const HistoryController = require("../controllers/history");

router.get("/history", HistoryController.Index);

module.exports = router;
