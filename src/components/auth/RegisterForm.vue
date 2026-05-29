<script setup>
// Import ref for storing form values
import { ref } from 'vue'

// Import router for page navigation
import { useRouter } from 'vue-router'

// Create router object
const router = useRouter()

// Store user input values
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// Store error message
const errorMessage = ref('')

// Handle create account button click
const handleRegister = () => {
  // Check empty fields
  if (
    name.value === '' ||
    email.value === '' ||
    password.value === '' ||
    confirmPassword.value === ''
  ) {
    errorMessage.value = 'Please fill all fields'
    return
  }

  // Check password match
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  // For now, no backend
  // After successful registration, go to login page
  router.push('/')
}

// Go back to login page
const goToLogin = () => {
  router.push('/')
}
</script>

<template>
  <!-- Register Card -->
  <div class="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

    <!-- App Title -->
    <h1 class="mb-6 text-center text-3xl font-bold">
      Create Account
    </h1>

    <!-- Error Message -->
    <p
      v-if="errorMessage"
      class="mb-4 rounded-lg bg-red-100 p-3 text-center text-red-600"
    >
      {{ errorMessage }}
    </p>

    <!-- Name -->
    <div class="mb-4">
      <label>Name</label>

      <input
        v-model="name"
        type="text"
        placeholder="Enter your name"
        class="mt-1 w-full rounded-lg border p-3"
      />
    </div>

    <!-- Email -->
    <div class="mb-4">
      <label>Email</label>

      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        class="mt-1 w-full rounded-lg border p-3"
      />
    </div>

    <!-- Password -->
    <div class="mb-4">
      <label>Password</label>

      <input
        v-model="password"
        type="password"
        placeholder="Create password"
        class="mt-1 w-full rounded-lg border p-3"
      />
    </div>

    <!-- Confirm Password -->
    <div class="mb-6">
      <label>Confirm Password</label>

      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm password"
        class="mt-1 w-full rounded-lg border p-3"
      />
    </div>

    <!-- Create Account Button -->
    <button
      @click="handleRegister"
      class="mb-3 w-full rounded-lg bg-blue-600 p-3 text-white"
    >
      Create Account
    </button>

    <!-- Back to Login Button -->
    <button
      @click="goToLogin"
      class="w-full rounded-lg border p-3"
    >
      Back to Login
    </button>

  </div>
</template>