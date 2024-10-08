const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const configuration = require('@feathersjs/configuration');

const app = express(feathers());

// Load app configuration
app.configure(configuration());

// You can add services and other middleware here

module.exports = app;
