<template>
  <div class="min-h-screen bg-gray-100">
    <Header />
    <HeroSection @scrollToCalculator="scrollToCalculator" />
    <section ref="calculatorSection" class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8">Insurance Rate Calculator</h2>
        <RateCalculatorForm @calculateRate="calculateRate" v-model="formData" />
        <RateResult :calculatedRate="calculatedRate" :paymentMethod="formData.paymentMethod" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from './components/Header.vue'
import HeroSection from './components/HeroSection.vue'
import RateCalculatorForm from './components/RateCalculatorForm.vue'
import RateResult from './components/RateResult.vue'

const calculatorSection = ref(null)
const formData = ref({
  insuranceType: '',
  coverageAmount: '',
  term: '',
  paymentMethod: '',
  individualFactor: ''
})
const calculatedRate = ref(null)

const scrollToCalculator = () => {
  calculatorSection.value.scrollIntoView({ behavior: 'smooth' })
}

const calculateRate = (data) => {
  // This is a placeholder calculation. In a real application, you would likely
  // make an API call to get the actual rate based on the form data.
  const baseRate = parseInt(data.coverageAmount) / 1000
  const termFactor = parseInt(data.term) * 0.9
  const paymentFactor = data.paymentMethod === 'annually' ? 0.95 : 1
  let rate = baseRate * termFactor * paymentFactor

  switch (data.insuranceType) {
    case 'car':
      rate *= parseInt(data.individualFactor) > 20000 ? 1.2 : 1
      break
    case 'home':
      rate *= parseInt(data.individualFactor) > 100 ? 1.3 : 1
      break
    case 'life':
      rate *= parseInt(data.individualFactor) > 50 ? 1.5 : 1
      break
  }

  calculatedRate.value = `€${rate.toFixed(2)}`
}
</script>
