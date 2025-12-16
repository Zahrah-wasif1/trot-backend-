import serverless from 'serverless-http';
import app, { initializeDB } from '../server';

// Initialize DB connection for Vercel
initializeDB().catch(console.error);

export default serverless(app);
