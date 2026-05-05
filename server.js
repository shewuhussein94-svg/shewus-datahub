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
// ===== SHEWUS DATAHUB API ROUTES =====

// 1. GET ALL DATA PLANS
app.get("/api/plans", (req, res) => {
  const plans = [
    { id: 1, network: "MTN", size: "1GB", price: 5, validity: "30 days" },
    { id: 2, network: "MTN", size: "2GB", price: 9, validity: "30 days" },
    { id: 3, network: "MTN", size: "5GB", price: 20, validity: "30 days" },
    { id: 4, network: "AirtelTigo", size: "1GB", price: 4.5, validity: "30 days" },
    { id: 5, network: "AirtelTigo", size: "3GB", price: 12, validity: "30 days" },
    { id: 6, network: "Vodafone", size: "1GB", price: 5, validity: "30 days" },
    { id: 7, network: "Vodafone", size: "2GB", price: 9.5, validity: "30 days" }
  ];
  res.json({ success: true, count: plans.length, data: plans });
});

// 2. CREATE NEW ORDER - Customer buys data
app.post("/api/order", express.json(), async (req, res) => {
  const { phone, planId, network, email } = req.body;
  
  // Basic validation
  if (!phone || !planId) {
    return res.status(400).json({ 
      success: false, 
      message: "Phone number and planId required" 
    });
  }

  // For now just return success. Later we'll save to MongoDB + hit VTU API
  const order = {
    orderId: "SHW" + Date.now(),
    phone,
    planId,
    network,
    email,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  res.status(201).json({ 
    success: true, 
    message: "Order received. Processing...",
    order 
  });
});

// 3. CHECK ORDER STATUS
app.get("/api/order/:orderId", (req, res) => {
  const { orderId } = req.params;
  // Later we'll fetch from MongoDB
  res.json({ 
    success: true, 
    orderId, 
    status: "pending",
    message: "Order is being processed" 
  });
});


// CATCH-ALL ROUTE
app.use( (req, res) => {
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
// Test route
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "API is working",
    time: new Date().toISOString(),
    status: "live"
  });
});

// Health check route  
app.get("/health", (req, res) => {
  res.json({ status: "healthy", db: "connected" });
});

// Your catch-all MUST stay at the bottom
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



// app.listen MUST BE LAST

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

