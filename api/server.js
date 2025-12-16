const serverless = require('serverless-http');
const { default: app, initializeDB } = require('../server.js');

// Initialize MongoDB connection
initializeDB().catch((err) => {
  console.error('Error initializing DB:', err);
});

module.exports = serverless(app);
