// Import express
const express = require('express')

// Import task controllers
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController')

// Import auth middleware
const protect = require('../middleware/authMiddleware')

// Create router
const router = express.Router()

// Get all tasks
router.get('/', protect, getTasks)

// Create task
router.post('/', protect, createTask)

// Update task
router.put('/:id', protect, updateTask)

// Delete task
router.delete('/:id', protect, deleteTask)

// Export router
module.exports = router