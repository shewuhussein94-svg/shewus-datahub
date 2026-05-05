const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

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

const path = require('path');

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.listen MUST BE LAST
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

