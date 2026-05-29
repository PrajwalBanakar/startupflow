<script setup>
// Import ref for storing input values
import { ref } from 'vue'

// Import router for page navigation
import { useRouter } from 'vue-router'

// Create router object
const router = useRouter()

// Store email entered by user
const email = ref('')

// Store password entered by user
const password = ref('')

// Store error message
const errorMessage = ref('')

// Function to handle login button click
const handleLogin = () => {
  // Check if email or password is empty
  if (email.value === '' || password.value === '') {
    errorMessage.value = 'Please enter email and password'
    return
  }

  // For now, we are not using backend authentication
  // So after entering any email and password, go to dashboard
  router.push('/dashboard')
}

// Function to go to create account page
const goToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <!-- Login Card -->
  <div class="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

    <!-- App Title -->
    <h1 class="mb-6 text-center text-3xl font-bold">
      StartupFlow
    </h1>

    <!-- Error Message -->
    <p
      v-if="errorMessage"
      class="mb-4 rounded-lg bg-red-100 p-3 text-center text-red-600"
    >
      {{ errorMessage }}
    </p>

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
    <div class="mb-6">
      <label>Password</label>

      <input
        v-model="password"
        type="password"
        placeholder="Enter your password"
        class="mt-1 w-full rounded-lg border p-3"
      />
    </div>

    <!-- Login Button -->
    <button
      @click="handleLogin"
      class="mb-3 w-full rounded-lg bg-blue-600 p-3 text-white"
    >
      Login
    </button>

    <!-- Create Account Button -->
    <button
      @click="goToRegister"
      class="w-full rounded-lg border p-3"
    >
      Create Account
    </button>

  </div>
</template>