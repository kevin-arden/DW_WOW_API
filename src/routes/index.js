const express = require("express");
const router = express.Router();
const { authenticated } = require("../middleware/auth");

//users
const { getUsers, deleteUser } = require("../controllers/users");

//auth
const { register } = require("../controllers/register");

const { login } = require("../controllers/login");

const { uploadFile } = require("../middleware/upload");

//books
const {
  getBooks,
  getDetailBook,
  addBook,
  editBook,
  deleteBook,
} = require("../controllers/books");

const {
  getAllTransactions,
  getTransaction,
  editTransaction,
  addTransaction,
} = require("../controllers/transactions");

//users
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);

//books
router.get("/books", getBooks);
router.get("/book/:id", getDetailBook);
router.post("/book/", authenticated, addBook);
router.patch("/book/:id", authenticated, editBook);
router.delete("/book/:id", authenticated, deleteBook);

router.post("/register", register);

router.post("/login", login);


router.get("/transactions", getAllTransactions);
router.get("/transaction/:id", getTransaction);
router.patch("/transaction/:id", editTransaction);
router.post("/transaction", uploadFile("transferProof"), addTransaction);

module.exports = router;
