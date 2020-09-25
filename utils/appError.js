class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.statusCode = `${statusCode}`.startsWith('4') ? 'Fail' : 'Error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = AppError;