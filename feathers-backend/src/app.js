const path = require('path');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const expressHandler = require('@feathersjs/express/express');
const rest = require('@feathersjs/express/rest');
const socketio = require('@feathersjs/socketio');
const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const { MongoClient } = require('mongodb');
const services = require('./services');
const { logger, logLevel } = require('./logger');
const {
  authenticationService,
  authenticationSetup,
  authenticationCleanup
} = require('./authentication');
const {
  insuranceCalculationService
} = require('./services/insurance-calculation/insurance-calculation.service.js');

const app = express();

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, and body parsing
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up an Express server
app.configure(expressHandler());
// Configure a real-time server with Socket.IO
app.configure(socketio());
// Configure authentication
app.configure(authentication(authenticationService));
app.configure(jwt());
app.configure(local());

// Set up our services (see `services/index.js`)
app.configure(services);
// Register your service
insuranceCalculationService(app);

// Configure a REST API
app.configure(rest());

// Configure the database
app.configure(
  'mongodb',
  {
    connection: process.env.MONGODB_URI || 'mongodb://localhost:27017/feathers-test',
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (db) => {
    // Register a global service that can be used by all other services
    app.set('mongodbClient', db);
  }
);

// Configure channels
app.configure(require('./channels'));

// Register hooks that are run on every service
app.hooks(require('./hooks'));

// Register a middleware that logs all incoming requests
app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  (req, res, next) => {
    logger.info(
      `Incoming request: ${req.method} ${req.url} from ${req.ip}`
    );
    next();
  }
);

// Register a middleware that logs all outgoing responses
app.use((req, res, next) => {
  res.on('finish', () => {
    logger.info(
      `Outgoing response: ${res.statusCode} ${req.method} ${req.url} from ${req.ip}`
    );
  });
  next();
});

// Configure a middleware that handles errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.status || 500).json({
    message: err.message,
    code: err.code
  });
});

// Register a middleware that handles uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles unhandled rejections
process.on('unhandledRejection', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Register a middleware that handles unhandled rejections
app.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

// Register a middleware that handles uncaught errors
app.use((err, req, res, next) => {
  logger.error(err