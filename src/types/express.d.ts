declare global {
  namespace Express {
    interface Request {
      /** Authenticated user ID, set by auth middleware when present. */
      userId?: number;
    }
  }
}

export {};
