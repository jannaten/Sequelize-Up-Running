/**
 * Operational error with an HTTP status code and a machine-readable code.
 * Errors that are NOT instances of AppError are treated as unexpected (bug) errors
 * and result in a 500 response in the global error handler.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational = true;

  /**
   * @param message - Human-readable error message sent to the client.
   * @param statusCode - HTTP status code (4xx for client errors, 5xx for server errors).
   * @param code - Machine-readable error code (e.g. "NOT_FOUND", "VALIDATION_ERROR").
   */
  constructor(message: string, statusCode: number, code = 'ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
