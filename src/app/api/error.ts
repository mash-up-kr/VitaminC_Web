export interface APIErrorType {}

export class APIError extends Error {
  constructor({ name, message }: { name: string; message: string }) {
    super(message);
    this.name = name;
    this.message = message;
  }
}
