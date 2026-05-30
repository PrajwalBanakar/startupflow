// Import JWT
const jwt = require('jsonwebtoken')

// Middleware to verify logged-in user
const protect = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization

  // Check token exists
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    })
  }

  // Token format: Bearer tokenvalue
  const token = authHeader.split(' ')[1]

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Store user info in request
    req.user = decoded

    // Continue to next function
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    })
  }
}

// Export middleware
module.exports = protect