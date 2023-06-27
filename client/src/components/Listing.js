import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button, TextField, IconButton } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Listing() {
  const [books, setBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const [editBookId, setEditBookId] = useState(null);
  const isLoggedIn = localStorage.getItem('token') !== null;
  const a = JSON.parse(localStorage.getItem('user'));
  const isAdmin = a.role === 'admin';

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const createBook = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      console.log(token);
      const response = await axios.post(
        'http://localhost:8000/api/books',
        {
          title: newBookTitle,
          author: newBookAuthor,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
     
      const createdBook = response.data;
      setBooks([...books, createdBook]);
      setNewBookTitle('');
      setNewBookAuthor('');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const updateBook = async (bookId, updatedTitle, updatedAuthor) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      console.log(token);

      await axios.put(
        `http://localhost:8000/api/books/${bookId}`,
        {
          title: updatedTitle,
          author: updatedAuthor,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const updatedBooks = books.map((book) =>
        book._id === bookId ? { ...book, title: updatedTitle, author: updatedAuthor } : book
      );
      setBooks(updatedBooks);
      setEditBookId(null);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      console.log(token);

      await axios.delete(`http://localhost:8000/api/books/${bookId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      const updatedBooks = books.filter((book) => book._id !== bookId);
      setBooks(updatedBooks);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleEditBook = (bookId) => {
    const book = books.find((book) => book._id === bookId);
    setEditBookId(bookId);
    setNewBookTitle(book.title);
    setNewBookAuthor(book.author);
  };

  const handleCancelEdit = () => {
    setEditBookId(null);
    setNewBookTitle('');
    setNewBookAuthor('');
  };

  return (
    <div>
      <h1>Listing</h1>
      {isLoggedIn && isAdmin && (
        <>
          <h2>Create Book</h2>
          <Card sx={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
            <TextField
              type="text"
              value={newBookTitle}
              onChange={(e) => setNewBookTitle(e.target.value)}
              label="Title"
              fullWidth
              sx={{ marginBottom: '10px' }}
            />
            <TextField
              type="text"
              value={newBookAuthor}
              onChange={(e) => setNewBookAuthor(e.target.value)}
              label="Author"
              fullWidth
              sx={{ marginBottom: '10px' }}
            />
            <Button onClick={createBook} variant="contained" color="primary">
              Add Book
            </Button>
          </Card>
        </>
      )}

      <h2>Books</h2>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <Card sx={{ height: '100%', backgroundColor: '#f5f5f5' }}>
              <CardContent>
                {editBookId === book._id ? (
                  <>
                    <Typography variant="h6" sx={{ marginBottom: '10px' }}>Title:</Typography>
                    <TextField
                      type="text"
                      value={newBookTitle}
                      onChange={(e) => setNewBookTitle(e.target.value)}
                      fullWidth
                      sx={{ marginBottom: '10px' }}
                    />
                    <Typography variant="h6" sx={{ marginBottom: '10px' }}>Author:</Typography>
                    <TextField
                      type="text"
                      value={newBookAuthor}
                      onChange={(e) => setNewBookAuthor(e.target.value)}
                      fullWidth
                      sx={{ marginBottom: '10px' }}
                    />
                    <Button
                      onClick={() => updateBook(book._id, newBookTitle, newBookAuthor)}
                      variant="contained"
                      color="success"
                      sx={{ marginRight: '10px' }}
                    >
                      Update
                    </Button>
                    <Button onClick={handleCancelEdit} variant="outlined" color="error">
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" sx={{ marginBottom: '10px' }}>Title:</Typography>
                    <Typography variant="body1" component="div" sx={{ color: blueGrey[900] }}>
                      {book.title}
                    </Typography>
                    <Typography variant="h6" sx={{ marginBottom: '10px', marginTop: '10px' }}>Author:</Typography>
                    <Typography variant="body1" component="div" sx={{ color: blueGrey[700] }}>
                      {book.author}
                    </Typography>
                    {isLoggedIn && isAdmin && (
                      <>
                        <IconButton
                          onClick={() => handleEditBook(book._id)}
                          color="warning"
                          sx={{ marginTop: '10px' }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteBook(book._id)}
                          color="error"
                          sx={{ marginTop: '10px' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Listing;