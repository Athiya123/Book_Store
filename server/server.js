const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

app.use(express.json());

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port} 🎆`));