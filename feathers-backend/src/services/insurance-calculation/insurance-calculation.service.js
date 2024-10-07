// Feathers service for insurance calculation
module.exports = function(app) {
  class InsuranceCalculationService {
    async create(data) {
      // This is where you'd implement your actual calculation logic
      // For this example, we'll use a simplified calculation
      let rate = parseFloat(data.coverageAmount) / 1000;
      const termFactor = parseFloat(data.term) * 0.9;
      const paymentFactor = data.paymentMethod === 'annually' ? 0.95 : 1;
      rate *= termFactor * paymentFactor;

      switch (data.insuranceType) {
        case 'car':
          rate *= parseFloat(data.individualFactor) > 20000 ? 1.2 : 1;
          break;
        case 'home':
          rate *= parseFloat(data.individualFactor) > 100 ? 1.3 : 1;
          break;
        case 'life':
          rate *= parseFloat(data.individualFactor) > 50 ? 1.5 : 1;
          break;
      }

      // Calculate discounts
      const discounts = [];
      if (data.paymentMethod === 'annually') {
        discounts.push({
          id: 'annual_payment',
          description: 'Annual Payment Discount',
          amount: '5%'
        });
      }

      // Generate upselling suggestions
      const upsellingSuggestions = [
        {
          id: 'extended_coverage',
          description: 'Extended Coverage',
          price: `€${(rate * 0.1).toFixed(2)}`
        },
        {
          id: 'additional_service',
          description: '24/7 Customer Support',
          price: `€${(rate * 0.05).toFixed(2)}`
        }
      ];

      return {
        rate,
        discounts,
        upsellingSuggestions
      };
    }
  }

  app.use('/insurance-calculation', new InsuranceCalculationService());
};
