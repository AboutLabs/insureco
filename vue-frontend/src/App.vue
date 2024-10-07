<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center">
          <img src="/placeholder.svg?height=40&width=40" alt="Company Logo" class="h-10 w-10 mr-2" />
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

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="md:w-2/3">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Protect What Matters Most</h1>
          <p class="text-xl mb-8">Get personalized insurance quotes in minutes with our easy-to-use calculator.</p>
          <button @click="scrollToCalculator" class="bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300">
            Calculate Insurance Now
          </button>
        </div>
      </div>
    </section>

    <!-- Rate Calculator Form -->
    <section ref="calculatorSection" class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8">Insurance Rate Calculator</h2>
        <form @submit.prevent="calculateRate" class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
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

        <!-- Result Display -->
        <div v-if="calculatedRate" class="mt-8 p-6 bg-green-100 border border-green-300 rounded-lg">
          <h3 class="text-2xl font-bold text-green-800 mb-2">Your Estimated Rate</h3>
          <p class="text-xl text-green-700">{{ calculatedRate }} per {{ formData.paymentMethod === 'monthly' ? 'month' : 'year' }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import './assets/index.css'

const calculatorSection = ref(null)
const formData = ref({
  insuranceType: '',
  coverageAmount: '',
  term: '',
  paymentMethod: '',
  individualFactor: ''
})
const calculatedRate = ref(null)

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

const scrollToCalculator = () => {
  calculatorSection.value.scrollIntoView({ behavior: 'smooth' })
}

const calculateRate = () => {
  // This is a placeholder calculation. In a real application, you would likely
  // make an API call to get the actual rate based on the form data.
  const baseRate = parseInt(formData.value.coverageAmount) / 1000
  const termFactor = parseInt(formData.value.term) * 0.9
  const paymentFactor = formData.value.paymentMethod === 'annually' ? 0.95 : 1
  let rate = baseRate * termFactor * paymentFactor

  switch (formData.value.insuranceType) {
    case 'car':
      rate *= parseInt(formData.value.individualFactor) > 20000 ? 1.2 : 1
      break
    case 'home':
      rate *= parseInt(formData.value.individualFactor) > 100 ? 1.3 : 1
      break
    case 'life':
      rate *= parseInt(formData.value.individualFactor) > 50 ? 1.5 : 1
      break
  }

  calculatedRate.value = `€${rate.toFixed(2)}`
}
</script>