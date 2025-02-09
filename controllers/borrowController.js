const Borrow = require("../models/borrowModel");
const Book = require("../models/bookModel");

const requestBorrow = async (req, res) => {
  const { bookId, borrowerId } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (!book || book.status !== "available") {
      return res.status(400).json({ message: "Book is not available for borrowing" });
    }
    const borrowRequest = new Borrow({ book: bookId, borrower: borrowerId });
    const savedRequest = await borrowRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveBorrow = async (req, res) => {
  const { borrowId } = req.params;
  try {
    const borrow = await Borrow.findById(borrowId);
    if (!borrow) return res.status(404).json({ message: "Borrow request not found" });

    borrow.status = "Approved";
    borrow.borrowedAt = new Date();
    await borrow.save();

    const book = await Book.findById(borrow.book);
    book.status = "borrowed";
    book.borrower = borrow.borrower;
    await book.save();

    res.json(borrow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const returnBook = async (req, res) => {
  const { borrowId } = req.params;
  try {
    const borrow = await Borrow.findById(borrowId);
    if (!borrow || borrow.status !== "Approved") return res.status(400).json({ message: "Invalid return request" });

    borrow.status = "Returned";
    borrow.returnedAt = new Date();
    await borrow.save();

    const book = await Book.findById(borrow.book);
    book.status = "available";
    book.borrower = null;
    await book.save();

    res.json(borrow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { requestBorrow, approveBorrow, returnBook };