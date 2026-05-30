// Backend base URL
const API_URL = 'http://localhost:5000/api'

// Register user API
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  return response.json()
}

// Login user API
export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  return response.json()
}

// Get all tasks API
export const getTasks = async () => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.json()
}

// Create task API
export const createTask = async (title) => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  })

  return response.json()
}

// Update task API
export const updateTask = async (id, title) => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  })

  return response.json()
}

// Delete task API
export const deleteTask = async (id) => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.json()
}