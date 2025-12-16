import serverless from 'serverless-http';
import app, { initializeDB } from '../server.js';

// Initialize DB connection for Vercel
initializeDB().catch(console.error);

export default serverless(app);
