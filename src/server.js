import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRouter from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

const startServer = async () => {
  try {
    // 1. Connect to MongoDB before starting server
    await connectMongoDB();

    const app = express();

    // 2. Middlewares
    app.use(logger);
    app.use(
      cors({
        origin: true,
        credentials: true,
      }),
    );
    app.use(express.json());
    app.use(cookieParser());

    // 3. Register routes
    app.use(authRouter);
    app.use(userRouter);
    app.use(notesRouter);

    // 4. Celebrate Validation errors
    app.use(errors());

    // 5. Not Found handler
    app.use(notFoundHandler);

    // 6. Global Error handler
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
