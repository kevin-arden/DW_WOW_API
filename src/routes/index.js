const express = require("express");
const router = express.Router();

//users
const { getUsers, deleteUser } = require("../controllers/users");

//books
const { getBooks, getDetailBook } = require("../controllers/books");

//users
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);

//books
router.get("/books", getBooks);
router.get("/book/:id", getDetailBook);

module.exports = router;
