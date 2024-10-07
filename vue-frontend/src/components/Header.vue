<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <font-awesome-icon icon="fa-regular fa-handshake" class="text-3xl text-blue-500 mr-2" />
        <span class="text-xl font-bold text-gray-800">InsureCo</span>
      </div>
      <nav class="hidden md:flex space-x-4">
        <a href="#" class="text-gray-600 hover:text-gray-800">About Us</a>
        <a href="#" class="text-gray-600 hover:text-gray-800">Services</a>
        <a href="#" class="text-gray-600 hover:text-gray-800">Contact</a>
      </nav>
      <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Login / Register
      </button>
    </div>
  </header>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>
