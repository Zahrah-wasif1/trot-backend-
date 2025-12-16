const serverless = require('serverless-http');
const { default: app,connectDB} = require('../server.js');

// Initialize MongoDB connection
connectDB();

module.exports = serverless(app);
