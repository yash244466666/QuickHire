import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[Error] ${statusCode}: ${message}`);

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  const error: AppError = new Error('Route not found');
  error.statusCode = 404;
  next(error);
};
