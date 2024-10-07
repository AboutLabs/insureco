<template>
  <div v-if="calculatedRate" class="mt-8 p-6 bg-green-100 border border-green-300 rounded-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-2">Your Estimated Rate</h3>
    <p class="text-xl text-green-700">{{ calculatedRate }} per {{ paymentMethod === 'monthly' ? 'month' : 'year' }}</p>
  </div>
</template>

<script setup>
defineProps({
  calculatedRate: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  }
})
</script>
