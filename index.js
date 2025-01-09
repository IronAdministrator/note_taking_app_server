const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const noteRoutes = require('./routes/notes');

const app = express();
const port = 3000; // or any port of your choice

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/noteDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Simple route to check server is running
app.get('/', (req, res) => {
  res.send('Hello from the Note-Taking App server!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Use the notes routes
app.use('/api/notes', noteRoutes);