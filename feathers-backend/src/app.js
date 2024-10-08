const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const app = express(feathers());

// Handle app-level errors
app.on('error', (error, ctx) => {
  console.error('Error in Feathers app:', error);
});

// ... rest of code ...
