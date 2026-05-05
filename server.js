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

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
const path = require('path');

// Serve static files from React build or public folder
app.use(express.static(path.join(__dirname, 'public'))); // or 'build' or 'dist'

// Catch-all for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // adjust folder name
});
