class AppError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.message = message;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }

  format() {
    const errorResponse = {
      statusCode: this.statusCode,
      message: this.message,
      isOperational: this.isOperational,
      success: false
    };

    if (this.errors && this.errors.length > 0) {
      errorResponse.errors = this.errors;
    }

    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = this.stack;
    }

    return errorResponse;
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(404, message);
    this.name = 'NotFoundError';
  }
}

class InternalValidationError extends AppError {
  constructor(errorsOrMessage = 'Validation failed') {
    if (Array.isArray(errorsOrMessage)) {
      super(400, 'Validation failed');
      this.errors = errorsOrMessage;
    } else {
      super(400, errorsOrMessage);
    }
    this.name = 'InternalValidationError';
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(401, message);
    this.name = 'UnauthorizedError';
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(403, message);
    this.name = 'ForbiddenError';
  }
}

class UserNotFoundError extends AppError {
  constructor(message = 'User not found') {
    super(404, message);
    this.name = 'UserNotFoundError';
  }
}

class UnknownError extends AppError {
  constructor(message = 'Unknown error', errorStack = '') {
    super(500, message);
    this.errorStack = errorStack;
    this.name = 'InternalError';
  }
}

function isAppError(error) {
  return (
    error instanceof AppError ||
    error instanceof NotFoundError ||
    error instanceof InternalValidationError ||
    error instanceof UnauthorizedError ||
    error instanceof ForbiddenError ||
    error instanceof UserNotFoundError ||
    error instanceof UnknownError
  );
}


module.exports = {
  AppError,
  NotFoundError,
  InternalValidationError,
  UnauthorizedError,
  ForbiddenError,
  UserNotFoundError,
  UnknownError,
  isAppError
};
