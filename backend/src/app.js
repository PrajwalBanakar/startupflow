// Import Express framework
const express = require('express')

// Import CORS to allow frontend to call backend
const cors = require('cors')

// Import database connection
const pool = require('./config/db')

// Import auth routes
const authRoutes = require('./routes/authRoutes')

// Import task routes
const taskRoutes = require('./routes/taskRoutes')

// Create Express app
const app = express()

// Enable CORS
app.use(cors())

// Allow backend to read JSON request body
app.use(express.json())

// Auth routes
app.use('/api/auth', authRoutes)

// Task routes
app.use('/api/tasks', taskRoutes)

// Test database connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')

    res.json({
      success: true,
      time: result.rows[0],
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Database connection failed',
    })
  }
})

// Test route
app.get('/', (req, res) => {
  res.send('StartupFlow Backend is running')
})

// Export app
module.exports = app