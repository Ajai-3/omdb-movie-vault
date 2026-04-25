import { AppError } from '../middleware/errorHandler';
import { HttpStatus } from '../constants/https-status';

export class BadRequestError extends AppError {
  constructor(message: string) {
    
    super(message, HttpStatus.BAD_REQUEST);
    this.name = 'BadRequestError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {

    super(message, HttpStatus.NOT_FOUND);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
    this.name = 'UnauthorizedError';
  }
}

export class InternalServerError extends AppError {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    this.name = 'InternalServerError';
  }
}
