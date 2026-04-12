import type { Request, Response, NextFunction } from 'express';
import { AxiosError } from 'axios';
import { MOVIE_MESSAGES } from '@/constants/movieMessages';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function errorHandler(
  err: Error | AppError | AxiosError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error('[ErrorHandler]', err.message);

  if ((err as AxiosError).isAxiosError) {
    const axiosErr = err as AxiosError;
    const status = axiosErr.response?.status || 502;
    res.status(status).json({
      success: false,
      error: MOVIE_MESSAGES.FAILED_TO_REACH_OMDB_API,
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
    error: MOVIE_MESSAGES.UNEXPECTED_SERVER_ERROR,
    statusCode: 500,
  });
}
