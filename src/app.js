import express from 'express';
import { createSplitRouter } from './interfaces/http/splitRoute.js';

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use('/api', createSplitRouter());
  app.use((error, request, response, next) => {
    if (response.headersSent) {
      next(error);
      return;
    }

    response.status(error.status === 400 ? 400 : 500).json({
      errors: [{ field: 'body', message: 'Invalid JSON' }],
    });
  });

  return app;
}

export { express };