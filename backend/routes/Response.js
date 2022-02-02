class Response {
    constructor() { }

    static success(req, res, message, data) {
        res.status(200).json({
            status: 200,
            message: message || 'Success',
            data: data
        });
    }

    static notFound(req, res, message, data) {
        res.status(404).json({
            status: 404,
            message: message || 'Not Found',
            data: data
        });
    }

    static existsAlready(req, res, message, data) {
        res.status(300).json({
            status: 300,
            message: message || 'Already Exists',
            data: data
        });
    }

    static badRequest(req, res, message, data) {
        res.status(400).json({
            status: 400,
            message: message || 'bad request or insuffecient information',
            data: data
        });
    }

    static unauthorized(req, res, message, data) {
        res.status(401).json({
            status: 401,
            message: message || 'Unauthorized.',
            data: data
        });
    }

    // static serverError(req, res, message, errorMessage){
    static serverError(req, res, errorMessage, errorObj) {
        res.status(500).json({
            status: 500,
            message: errorMessage || 'internal server error',
            data: { details: errorObj }
        });
    }

    static newOTPSetup(req, res, message, data) {
        res.status(203).json({
            status: 203,
            message: message || 'NEW OTP TO BE GENERATED',
            data: data
        });
    }
    static failedOTPVerification(req, res, message, data) {
        res.status(403).json({
            status: 203,
            message: message || 'OTP Verification Failed',
            data: data
        });
    }

}

module.exports = Response;