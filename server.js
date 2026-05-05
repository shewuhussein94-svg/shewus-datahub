const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));

// YOUR API ROUTES HERE
// app.get('/api/bundles',...)

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// CATCH-ALL ROUTE
app.get( (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.listen MUST BE LAST
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDconnected'))
  .catch(err => console.log(err));

const bundleSchema = new mongoose.Schema({
  network: String,
  size: String, 
  price: Number,
  validity: String
});
const Bundle = mongoose.model('Bundle', bundleSchema);

// THIS IS THE MISSING ROUTE
app.get('/api/bundles', async (req, res) => {
  const bundles = await Bundle.find();
  res.json(bundles);
});



// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all for React Router
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.listen MUST BE LAST

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

