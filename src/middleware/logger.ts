import { Request, Response, NextFunction } from 'express';

/**
 * Logs incoming requests and their processing time.
 */
export const logger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
  });

  next();
};
