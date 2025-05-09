const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Route files
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

let isMongoConnected = false;


app.use(cors());


// Parse incoming JSON
app.use(express.json());

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Block requests until Mongo is connected
app.use((req, res, next) => {
  if (req.path === '/') {
    return next();
  }
  if (!isMongoConnected) {
    return res.status(503).json({ error: 'Server is starting up, please try again shortly' });
  }
  next();
});

// ======== Routes ======== //
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api', authRoutes);

// Health check route (important for EB)
app.get('/', (req, res) => {
  res.send('OK');
});

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

// ======== Server Start ======== //
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

// ======== MongoDB Connection ======== //
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // Optional: fail faster if Mongo isn't reachable
})
  .then(() => {
    isMongoConnected = true;
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
