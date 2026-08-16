import { Request, Response, NextFunction } from 'express';

/**
 * Centralized error handler to catch unexpected issues and return
 * responses in the OpenAI error format.
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error('❌ Unhandled error:', err);

  const status = err.status || err.response?.status || 500;
  const message = err.message || 'An internal server error occurred';

  res.status(status).json({
    error: {
      message,
      type: 'server_error',
      param: null,
      code: 'internal_error'
    }
  });
};
