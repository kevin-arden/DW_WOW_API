const express = require("express");
const router = express.Router();
const { authenticated } = require("../middleware/auth");

//users
const { getUsers, deleteUser } = require("../controllers/users");

//auth
const { register } = require("../controllers/register");


//books
const {
  getBooks,
  getDetailBook,
  addBook,
  editBook,
  deleteBook,
} = require("../controllers/books");

//users
router.get("/users", authenticated, getUsers);
router.delete("/user/:id", deleteUser);

//books
router.get("/books", getBooks);
router.get("/book/:id", getDetailBook);
router.post("/book/", addBook);
router.patch("/book/:id", editBook);
router.delete("/book/:id", deleteBook);

router.post("/register", register);


module.exports = router;
