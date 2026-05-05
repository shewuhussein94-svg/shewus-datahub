const express = require('express');
const Bundle = require('../models/Bundle/');
const router = express.Router();

router.get('/', async (req, res) => {
const bundles = await Bundle.find();
res.json(bundles);
});

module.exports = router;
