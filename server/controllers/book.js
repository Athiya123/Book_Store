const Book = require('../model/Book');

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get books' });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    console.log(title, author);
    const token = req.headers.cookie;
    // console.log(token);
    const book = new Book({ title, author });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create book' });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author } = req.body;
    const book = await Book.findByIdAndUpdate(id, { title, author }, { new: true });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndRemove(id);
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

module.exports = { getBooks, createBook, updateBook, deleteBook };