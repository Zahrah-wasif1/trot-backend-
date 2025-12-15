import serverless from 'serverless-http';
import app, { connectDB } from '../server';

// Make sure DB is connected
connectDB();

export default serverless(app);
