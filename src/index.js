import dotenv from 'dotenv';
import { setupServer } from './server.js';

// Load environment variables from .env file
dotenv.config();

// Initialize and start the Express server
setupServer();
