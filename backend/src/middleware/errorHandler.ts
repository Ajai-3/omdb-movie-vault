import type { Request, Response, NextFunction } from 'express';
import { AxiosError } from 'axios';
import { ERROR_MESSAGES } from '@/constants/messages';
import { HttpStatus } from '@/constants/https-status';

export class AppError extends Error {
  constructor(
    public override message: string,
    public statusCode: number = 500,
  ) {
    super(message);
    this.name = 'AppError';

    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(
  err: Error | AppError | AxiosError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error('[ErrorHandler] Full Error:', err);

  if ((err as AxiosError).isAxiosError) {
    const axiosErr = err as AxiosError;
    const status = axiosErr.response?.status || HttpStatus.BAD_GATEWAY;
    res.status(status).json({
      status: false,
      error: ERROR_MESSAGES.FAILED_TO_FETCH_MOVIES,
      statusCode: status,
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: false,
      error: err.message,
      statusCode: err.statusCode,
    });
    return;
  }

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    status: false,
    error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  });
}
