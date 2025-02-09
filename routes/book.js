const express = require("express");
const Book = require("../models/Book"); // Adjust path based on your structure
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { title, author, image, available } = req.body;

        const newBook = new Book({
            title,
            author,
            image: image || "default.jpg", // Use a default image if none provided
            available: available === "true" // Convert to boolean
        });

        await newBook.save();
        res.redirect("/dashboard"); // Redirect to dashboard after adding book
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).send("Error adding book");
    }
});

module.exports = router;
