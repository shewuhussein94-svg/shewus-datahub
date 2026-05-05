const mongoose = require('mongoose');
const BundleSchema = new mongoose.Schema({
network: String,
size: String,
price: Number
});
module.exports = mongoose.model('Bundle', BundleSchema);
