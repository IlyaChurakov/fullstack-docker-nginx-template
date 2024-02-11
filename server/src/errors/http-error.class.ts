export class HttpError extends Error {
    public statusCode: number;
    public context?: string;
  
    constructor(code: number, message: string, context?: string) {
      super();
      this.statusCode = code;
      this.message = message;
      this.context = context;
    }
  }