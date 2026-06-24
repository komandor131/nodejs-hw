import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRouter from './routes/notesRoutes.js';

dotenv.config();

const startServer = async () => {
  try {
    // 1. Connect to MongoDB before starting server
    await connectMongoDB();

    const app = express();

    // 2. Middlewares
    app.use(logger);
    app.use(cors());
    app.use(express.json());

    // 3. Register routes
    app.use(notesRouter);

    // 4. Not Found handler
    app.use(notFoundHandler);

    // 5. Global Error handler
    app.use(errorHandler);

    // 6. Start server
    const PORT = Number(process.env.PORT) || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer();
