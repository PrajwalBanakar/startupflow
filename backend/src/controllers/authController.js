// Import database connection
const pool = require('../config/db')

// Import bcrypt for password hashing/checking
const bcrypt = require('bcrypt')

// Import JWT for login token
const jwt = require('jsonwebtoken')

// Register user
const registerUser = async (req, res) => {
  try {
    // Get data from request body
    const { name, email, password } = req.body

    // Validate empty fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Save user
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    )

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: result.rows[0],
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Server error',
    })
  }
}

// Login user
const loginUser = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body

    // Validate empty fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      })
    }

    // Find user by email
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    // If user not found
    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    // Store found user
    const user = result.rows[0]

    // Compare typed password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    // If password is wrong
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    )

    // Send login response
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Server error',
    })
  }
}

// Export controllers
module.exports = {
  registerUser,
  loginUser,
}