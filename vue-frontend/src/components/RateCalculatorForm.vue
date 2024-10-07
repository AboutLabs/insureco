<template>
  <form @submit.prevent="$emit('calculateRate', formData)" class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
    <!-- Insurance Type -->
    <div class="mb-6">
      <label for="insuranceType" class="block text-gray-700 font-semibold mb-2">Insurance Type</label>
      <select
        id="insuranceType"
        v-model="formData.insuranceType"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Insurance Type</option>
        <option value="car">Car Insurance</option>
        <option value="home">Home Insurance</option>
        <option value="life">Life Insurance</option>
      </select>
    </div>

    <!-- Coverage Amount -->
    <div class="mb-6">
      <label for="coverageAmount" class="block text-gray-700 font-semibold mb-2">Coverage Amount</label>
      <select
        id="coverageAmount"
        v-model="formData.coverageAmount"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Coverage Amount</option>
        <option value="100000">€100,000</option>
        <option value="200000">€200,000</option>
        <option value="300000">€300,000</option>
      </select>
    </div>

    <!-- Term -->
    <div class="mb-6">
      <label for="term" class="block text-gray-700 font-semibold mb-2">Term</label>
      <select
        id="term"
        v-model="formData.term"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Term</option>
        <option value="1">1 Year</option>
        <option value="3">3 Years</option>
        <option value="5">5 Years</option>
      </select>
    </div>

    <!-- Payment Method -->
    <div class="mb-6">
      <label class="block text-gray-700 font-semibold mb-2">Payment Method</label>
      <div class="flex space-x-4">
        <label class="inline-flex items-center">
          <input type="radio" v-model="formData.paymentMethod" value="monthly" class="form-radio text-blue-500" required />
          <span class="ml-2">Monthly</span>
        </label>
        <label class="inline-flex items-center">
          <input type="radio" v-model="formData.paymentMethod" value="annually" class="form-radio text-blue-500" required />
          <span class="ml-2">Annually</span>
        </label>
      </div>
    </div>

    <!-- Individual Factors -->
    <div v-if="formData.insuranceType" class="mb-6">
      <label :for="individualFactorId" class="block text-gray-700 font-semibold mb-2">{{ individualFactorLabel }}</label>
      <input
        :id="individualFactorId"
        v-model="formData.individualFactor"
        :type="individualFactorType"
        :placeholder="individualFactorPlaceholder"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <!-- Submit Button -->
    <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition duration-300">
      Calculate Rate
    </button>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'

const formData = ref({
  insuranceType: '',
  coverageAmount: '',
  term: '',
  paymentMethod: '',
  individualFactor: ''
})

const individualFactorLabel = computed(() => {
  switch (formData.value.insuranceType) {
    case 'car':
      return 'Annual Mileage'
    case 'home':
      return 'Living Space (sqm)'
    case 'life':
      return 'Age'
    default:
      return ''
  }
})

const individualFactorId = computed(() => {
  return `individual-factor-${formData.value.insuranceType}`
})

const individualFactorType = computed(() => {
  return formData.value.insuranceType === 'life' ? 'number' : 'text'
})

const individualFactorPlaceholder = computed(() => {
  switch (formData.value.insuranceType) {
    case 'car':
      return 'Enter annual mileage'
    case 'home':
      return 'Enter living space in square meters'
    case 'life':
      return 'Enter your age'
    default:
      return ''
  }
})
</script>
