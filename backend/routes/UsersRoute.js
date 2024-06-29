const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserControllers");

// Register a new user
router.post("/register", userController.register);

// Login a user
router.post("/login", userController.login);

module.exports = router;
