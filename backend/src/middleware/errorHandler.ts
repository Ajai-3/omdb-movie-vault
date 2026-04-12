import type { Request, Response, NextFunction } from 'express';
import { AxiosError } from 'axios';

// Custom application error with optional HTTP status code
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: Error | AppError | AxiosError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error('[ErrorHandler]', err.message);

  // Handle Axios (OMDB fetch) errors
  if ((err as AxiosError).isAxiosError) {
    const axiosErr = err as AxiosError;
    const status = axiosErr.response?.status || 502;
    res.status(status).json({
      success: false,
      error: 'Failed to reach the OMDB API. Please try again later.',
      statusCode: status,
    });
    return;
  }

  // Handle our custom AppError
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
      statusCode: err.statusCode,
    });
    return;
  }

  // Fallback — unexpected server error
  res.status(500).json({
    success: false,
    error: 'An unexpected server error occurred',
    statusCode: 500,
  });
}
