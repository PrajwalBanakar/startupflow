<script setup>
// Import ref for reactive data
import { ref, computed } from 'vue'

// Import router for logout navigation
import { useRouter } from 'vue-router'

// Create router object
const router = useRouter()

// Store search input
const searchText = ref('')

// Store new task input
const newTask = ref('')

// Store editing task id
const editingTaskId = ref(null)

// Store edited task text
const editedTaskText = ref('')

// Show or hide profile menu
const showProfileMenu = ref(false)

// Dummy logged-in user email
const userEmail = ref('user@startupflow.com')

// Store task list
const tasks = ref([
  { id: 1, title: 'Complete startup profile' },
  { id: 2, title: 'Upload pitch deck' },
  { id: 3, title: 'Schedule mentor meeting' },
])

// Filter tasks based on search text
const filteredTasks = computed(() => {
  return tasks.value.filter((task) =>
    task.title.toLowerCase().includes(searchText.value.toLowerCase())
  )
})

// Add new task
const addTask = () => {
  if (newTask.value === '') {
    return
  }

  tasks.value.push({
    id: Date.now(),
    title: newTask.value,
  })

  newTask.value = ''
}

// Delete task
const deleteTask = (taskId) => {
  tasks.value = tasks.value.filter((task) => task.id !== taskId)
}

// Start editing task
const startEdit = (task) => {
  editingTaskId.value = task.id
  editedTaskText.value = task.title
}

// Save edited task
const saveEdit = (taskId) => {
  const task = tasks.value.find((task) => task.id === taskId)

  if (task && editedTaskText.value !== '') {
    task.title = editedTaskText.value
  }

  editingTaskId.value = null
  editedTaskText.value = ''
}

// Toggle profile menu
const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
}

// Logout user
const logout = () => {
  router.push('/')
}
</script>

<template>
  <!-- Main Dashboard Page -->
  <div class="min-h-screen bg-slate-100 p-6">

    <!-- Top Bar -->
    <div class="relative mb-6 flex items-center justify-between">

      <!-- Page Title -->
      <h1 class="text-2xl font-bold">
        StartupFlow
      </h1>

      <!-- Profile Button -->
      <button
        @click="toggleProfileMenu"
        class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white"
      >
        U
      </button>

      <!-- Profile Dropdown -->
      <div
        v-if="showProfileMenu"
        class="absolute right-0 top-12 w-56 rounded-lg bg-white p-4 shadow-lg"
      >
        <!-- User Email -->
        <p class="mb-3 text-sm text-slate-600">
          {{ userEmail }}
        </p>

        <!-- Logout Button -->
        <button
          @click="logout"
          class="w-full rounded-lg bg-red-500 p-2 text-white"
        >
          Logout
        </button>
      </div>

    </div>

    <!-- Search Bar -->
    <input
      v-model="searchText"
      type="text"
      placeholder="Search tasks..."
      class="mb-6 w-full rounded-lg border bg-white p-3"
    />

    <!-- Content Grid -->
    <div class="grid gap-6 md:grid-cols-2">

      <!-- Tasks Card -->
      <div class="rounded-xl bg-white p-6 shadow">

        <!-- Section Title -->
        <h2 class="mb-4 text-xl font-semibold">
          Tasks
        </h2>

        <!-- Add Task Area -->
        <div class="mb-4 flex gap-2">
          <input
            v-model="newTask"
            type="text"
            placeholder="Add new task"
            class="w-full rounded-lg border p-3"
          />

          <button
            @click="addTask"
            class="rounded-lg bg-blue-600 px-4 text-white"
          >
            Add
          </button>
        </div>

        <!-- Task Items -->
        <div class="space-y-3">

          <!-- Single Task -->
          <div
            v-for="task in filteredTasks"
            :key="task.id"
            class="rounded-lg border p-3"
          >

            <!-- Normal View -->
            <div
              v-if="editingTaskId !== task.id"
              class="flex items-center justify-between gap-3"
            >
              <!-- Task Title -->
              <span>
                {{ task.title }}
              </span>

              <!-- Action Buttons -->
              <div class="flex gap-2">
                <button
                  @click="startEdit(task)"
                  class="rounded bg-yellow-400 px-3 py-1 text-sm"
                >
                  Edit
                </button>

                <button
                  @click="deleteTask(task.id)"
                  class="rounded bg-red-500 px-3 py-1 text-sm text-white"
                >
                  Delete
                </button>
              </div>
            </div>

            <!-- Edit View -->
            <div
              v-else
              class="flex gap-2"
            >
              <input
                v-model="editedTaskText"
                type="text"
                class="w-full rounded border p-2"
              />

              <button
                @click="saveEdit(task.id)"
                class="rounded bg-green-600 px-3 text-white"
              >
                Save
              </button>
            </div>

          </div>

        </div>
      </div>

      <!-- AI Chatbot Card -->
      <div class="rounded-xl bg-white p-6 shadow">

        <!-- Section Title -->
        <h2 class="mb-4 text-xl font-semibold">
          AI Chatbot
        </h2>

        <!-- Chat Display -->
        <div class="mb-4 rounded-lg bg-slate-100 p-4">
          Hello! How can I help your startup today?
        </div>

        <!-- Chat Input -->
        <input
          type="text"
          placeholder="Ask something..."
          class="w-full rounded-lg border p-3"
        />
      </div>

    </div>
  </div>
</template>