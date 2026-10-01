/** Error carrying an HTTP status code; picked up by the central error handler. */
export class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
  }
}
