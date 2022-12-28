export class HandledError extends Error {
  constructor(message = 'An error has occurred') {
    super(message);
    this.name = 'HandledError';
  }
}
