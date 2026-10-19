import { ValidationError as OriginalValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";

export class ValidationError extends Error {
  originalErrors: OriginalValidationError[];

  constructor(errors: OriginalValidationError[]) {
    super();
    this.name = 'ValidationError';
    this.message = errors.map(error => {
        return Object.values(error.constraints!).join(', ');
      }).join(', ');
    this.originalErrors = errors;
  }
}

export const validationHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    res.status(400);
    res.json({
      error: err.name,
      message: err.message,
      details: err.originalErrors.map(err => ({
        property: err.property,
        value: err.value,
        constraints: err.constraints
      }))
    });
  } else {
    next(err);
  }
}
