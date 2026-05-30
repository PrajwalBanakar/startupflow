// Import express
const express = require('express')

// Import controller
const { registerUser, loginUser } = require('../controllers/authController')

// Create router
const router = express.Router()

// Register route
router.post('/register', registerUser)

// Login route
router.post('/login', loginUser)

// Export router
module.exports = router