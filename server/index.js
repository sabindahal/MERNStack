const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api', authRoutes);

// Start server after DB connects
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connect success");
    app.listen(5000, () => {
      console.log("The backend server runs on http://localhost:5000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connect fail:", err.message);
  });
