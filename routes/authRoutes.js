const express = require("express");
const router = express.Router();
const { signup, login } = require("../authController");

router.post("/signup");
router.post("/login");

GPUShaderModule.exports = router;