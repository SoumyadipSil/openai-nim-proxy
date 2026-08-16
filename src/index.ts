import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import { authenticate } from './middleware/auth';

import healthRouter from './routes/health';
import modelsRouter from './routes/models';
import chatRouter from './routes/chat';

const app = express();

// Security and utility middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(logger);

// Public routes
app.use('/health', healthRouter);

// Protected OpenAI compatible routes
app.use('/v1', authenticate);
app.use('/v1/models', modelsRouter);
app.use('/v1/chat', chatRouter);

// Global Error Handler
app.use(errorHandler);

const server = app.listen(env.PORT, () => {
  console.log(`🚀 NIM Proxy Server running on http://localhost:${env.PORT}`);
  console.log(`🔒 Secured with CLIENT_AUTH_KEY`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});
