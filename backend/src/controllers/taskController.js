// Import database connection
const pool = require('../config/db')

// Get all tasks for logged-in user
const getTasks = async (req, res) => {
  try {
    // Get user id from JWT middleware
    const userId = req.user.id

    // Fetch only this user's tasks
    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC',
      [userId]
    )

    res.json({
      success: true,
      tasks: result.rows,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Server error',
    })
  }
}

// Create new task
const createTask = async (req, res) => {
  try {
    // Get user id from JWT middleware
    const userId = req.user.id

    // Get title from request body
    const { title } = req.body

    // Validate title
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Task title is required',
      })
    }

    // Insert task
    const result = await pool.query(
      'INSERT INTO tasks (user_id, title) VALUES ($1, $2) RETURNING *',
      [userId, title]
    )

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task: result.rows[0],
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Server error',
    })
  }
}

// Update task
const updateTask = async (req, res) => {
  try {
    // Get task id from URL
    const taskId = req.params.id

    // Get user id from JWT middleware
    const userId = req.user.id

    // Get new title
    const { title } = req.body

    // Validate title
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Task title is required',
      })
    }

    // Update only if task belongs to logged-in user
    const result = await pool.query(
      'UPDATE tasks SET title = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [title, taskId, userId]
    )

    // If task not found
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      })
    }

    res.json({
      success: true,
      message: 'Task updated successfully',
      task: result.rows[0],
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Server error',
    })
  }
}

// Delete task
const deleteTask = async (req, res) => {
  try {
    // Get task id from URL
    const taskId = req.params.id

    // Get user id from JWT middleware
    const userId = req.user.id

    // Delete only if task belongs to logged-in user
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [taskId, userId]
    )

    // If task not found
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      })
    }

    res.json({
      success: true,
      message: 'Task deleted successfully',
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Server error',
    })
  }
}

// Export functions
module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
}