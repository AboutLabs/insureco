<template>
  <section class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
    <div class="container mx-auto px-4">
      <div class="md:w-2/3">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Protect What Matters Most</h1>
        <p class="text-xl mb-8">Get personalized insurance quotes in minutes with our easy-to-use calculator.</p>
        <button @click="$emit('scrollToCalculator')" class="bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300">
          Calculate Insurance Now
        </button>
      </div>
    </div>
  </section>
</template>
