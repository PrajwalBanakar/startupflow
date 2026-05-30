// Import environment variables
require('dotenv').config()

// Import Express app
const app = require('./app')

// Get port from .env or use 5000
const PORT = process.env.PORT || 5000

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})