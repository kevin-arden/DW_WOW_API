// let books = [
//   {
//     id: 1,
//     title: "Tess On Road",
//     publicationDate: "April 2020",
//     pages: 302,
//     author: "Rachel Hariman",
//     isbn: 9781789807554,
//     about: "in the medieval kingdom there are",
//     bookFile: "tess-on-road.epub",
//   },
//   {
//     id: 2,
//     title: "Serangkai",
//     publicationDate: "Mei 2018",
//     pages: 400,
//     author: "Varelie Patkar",
//     isbn: 9781789807510,
//     about: "Serangkai menceritakan berbagai macam hal",
//     bookFile: "serangkai.epub",
//   },
//   {
//     id: 3,
//     title: "Kabar Rahasia dari alam kubur",
//     publicationDate: "Januari 2015",
//     pages: 200,
//     author: "DR. Kamil Yusuf Al-Atum",
//     isbn: 9781789807533,
//     about: "Menggambarkan rahasia alam kubur",
//     bookFile: "kabar-rahasia.epub",
//   },
// ];

const { Book } = require("../../models");

exports.getBooks = async (req, res) => {
  try {
    const book = await Book.findAll();

    res.send({
      messages: "Book Successfully Retrieved",
      data: {
        book,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "Book Unsuccessfully Retrieved",
    });
  }
};

exports.getDetailBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findOne({ where: { id } });

    if (!book) {
      return res.send({
        message: `Book with id ${id} is not found`,
      });
    }

    res.send({
      status: `Book With id ${id} Successfully Found`,
      data: {
        book,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: `Book With id ${id} Unsuccessfully Found`,
    });
  }
};

exports.addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.send({
      message: "Book successfully added",
      data: {
        book,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "Book Unsuccessfully added",
    });
  }
};

exports.editBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({
      where: {
        id,
      },
    });

    if (!book) {
      return res.send({
        message: `Book with id ${id} is not found`,
      });
    }

    await Book.update(req.body, {
      where: { id },
    });

    const bookUpdated = await Book.findOne({
      where: { id },
    });

    res.send({
      message: `Book with id ${id} is successfully updated `,
      data: {
        book: bookUpdated,
      },
    });
  } catch (errr) {
    console.log(err);
    res.status(400).send({
      message: "Book Unsuccessfully updated",
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    await Book.destroy({
      where: { id },
    });

    res.send({
      messages: "Book Successfully Deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "Book Unsuccessfully deleted",
    });
  }
};
