const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const helpers = require("handlebars-helpers")();
const User = require("./models/userModel");

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/book-exchange", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

hbs.registerHelper(helpers);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
}));

// Set Handlebars as View Engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views/partials"));

// Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

// Dummy Data
let books = [
    { id: 1, title: "White Nights", author: "Fyodor Dostoevsky", image: "/images/1.jpg", description: "A short story originally published in 1848.", available: true },
    { id: 2, title: "Atomic Habits", author: "James Clear", image: "/images/2.png", description: "A book about habit-building strategies.", available: true },
];

let requests = [];

// 📍 Home - Display Books
app.get("/", (req, res) => {
    res.render("home", { title: "Book Exchange", books });
});

// 📍 Login Page
app.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});

// 📍 Signup Page
app.get("/signup", (req, res) => {
    res.render("signup", { title: "Sign Up" });
});

// 📍 Dashboard - View Books & Borrow Requests
app.get("/dashboard", (req, res) => {
    if (!req.session.user) return res.redirect("/login");
    res.render("dashboard", { title: "Dashboard", books, requests, user: req.session.user });
});

// 📍 Add Book Page
app.get("/add-book", (req, res) => {
    if (!req.session.user) return res.redirect("/login");
    res.render("add-book", { title: "Add a New Book" });
});

// 📍 Handle Adding a New Book
app.post("/add-book", (req, res) => {
    if (!req.session.user) return res.redirect("/login");

    const { title, author, image, description } = req.body;
    if (!title || !author || !image || !description) {
        return res.status(400).send("All fields are required!");
    }

    const newBook = {
        id: books.length + 1,
        title,
        author,
        image,
        description,
        available: true,
    };

    books.push(newBook);
    res.redirect("/dashboard");
});

// 📍 View a Single Book
app.get("/book/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find((b) => b.id === bookId);

    if (!book) {
        return res.status(404).send("Book not found!");
    }

    res.render("book", { title: book.title, book });
});

// 📍 Borrow Book Request
app.post("/borrow", (req, res) => {
    if (!req.session.user) return res.redirect("/login");

    const bookId = parseInt(req.body.bookId);
    const book = books.find((b) => b.id === bookId);

    if (!book || !book.available) {
        return res.status(400).send("Book is not available!");
    }

    requests.push({ id: requests.length + 1, book, requester: req.session.user.name });
    book.available = false;

    res.redirect("/dashboard");
});

// 📍 Approve Borrow Request
app.post("/borrow/:id/approve", (req, res) => {
    if (!req.session.user) return res.redirect("/login");

    const requestId = parseInt(req.params.id);
    requests = requests.filter((req) => req.id !== requestId);
    res.redirect("/dashboard");
});

// 📍 Decline Borrow Request
app.post("/borrow/:id/decline", (req, res) => {
    if (!req.session.user) return res.redirect("/login");

    const requestId = parseInt(req.params.id);
    const request = requests.find((req) => req.id === requestId);

    if (request) {
        const book = books.find((b) => b.id === request.book.id);
        if (book) book.available = true;
    }

    requests = requests.filter((req) => req.id !== requestId);
    res.redirect("/dashboard");
});

// 📍 Register Route
app.post("/api/users/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.redirect("/login");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error registering user");
    }
});

// 📍 Login Route
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }

  req.session.user = { id: user._id, name: user.name, email: user.email };
  res.json({ success: true, user: req.session.user });
});
app.get("/api/users/me", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});


// 📍 Logout Route
app.get("/api/users/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
