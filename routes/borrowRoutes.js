const express = require("express");
const { requestBorrow, approveBorrow, returnBook } = require("../controllers/borrowController");
const router = express.Router();

router.post("/", requestBorrow);
router.put("/:borrowId/approve", approveBorrow);
router.put("/:borrowId/return", returnBook);

module.exports = router;