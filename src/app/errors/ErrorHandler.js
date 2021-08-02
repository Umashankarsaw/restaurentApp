const logger = require('./logHandler');
class ErrorHandler {
    constructor(status, msg) {
        this.status = status;
        this.message = msg;
    }

    static validationError(message = 'All fields are required!') {
        logger.log(message);
        return new ErrorHandler(422, message);
    }

    static notFoundError(message = 'Not found!') {
        logger.log(message);
        return new ErrorHandler(404, message);
    }

    static serverError(message = 'Internal error') {
        logger.log(message);
        return new ErrorHandler(500, message);
    }

    static forbidden(message = 'Not allowed!') {
        logger.log(message);
        return new ErrorHandler(403, message);
    }
}

module.exports = ErrorHandler;