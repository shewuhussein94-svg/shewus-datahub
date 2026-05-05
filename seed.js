const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const bundleSchema = new mongoose.Schema({
  network: String, size: String, price: Number, validity: String
});
const Bundle = mongoose.model('Bundle', bundleSchema);

async function addBundles() {
  await Bundle.deleteMany({}); // clear old ones
  await Bundle.insertMany([
    { network: 'MTN', size: '1GB', price: 6, validity: '30 days' },
    { network: 'MTN', size: '2GB', price: 11, validity: '30 days' },
    { network: 'Vodafone', size: '1GB', price: 5.5, validity: '30 days' },
    { network: 'AirtelTigo', size: '1GB', price: 5, validity: '30 days' }
  ]);
  console.log('Bundles added!');
  process.exit();
}
addBundles();
