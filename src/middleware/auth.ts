import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';
import crypto from 'crypto';

/**
 * Validates the Bearer token against the configured CLIENT_AUTH_KEY.
 * Uses a constant-time string comparison to prevent timing attacks.
 */
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: {
        message: 'Missing or malformed Authorization header. Expected "Bearer <token>"',
        type: 'invalid_request_error',
        param: null,
        code: 'invalid_api_key'
      }
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  // Perform constant time string comparison
  const expectedKey = Buffer.from(env.CLIENT_AUTH_KEY);
  const providedKey = Buffer.from(token);

  if (expectedKey.length !== providedKey.length || !crypto.timingSafeEqual(expectedKey, providedKey)) {
    res.status(401).json({
      error: {
        message: 'Incorrect API key provided.',
        type: 'invalid_request_error',
        param: null,
        code: 'invalid_api_key'
      }
    });
    return;
  }

  next();
};
