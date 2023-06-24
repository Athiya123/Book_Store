const express = require('express');
const router = express.Router();
const { requireAuth, requireRole } = require('../middleware/authMiddleware');
const {
  getBooks,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/book');

router.get('/', getBooks);
router.post('/', requireAuth, requireRole('admin'), createBook);
router.put('/:id', requireAuth, requireRole('admin'), updateBook);
router.delete('/:id', requireAuth, requireRole('admin'), deleteBook);

module.exports = router;