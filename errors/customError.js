export class CustomError extends Error {
    constructor(message, statusCode) {
        super(Array.isArray(message) ? message.join(',') : message);
        this.statusCode = statusCode;
        this.errors = Array.isArray(message) ? message : [message];
    }
}