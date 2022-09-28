const ApiError = require('./ApiError')
const logger = require("../logger/logger");
const { errorNotifier } = require('../services/emailSender')

function apiErrorHandler(err, req, res, next){
	if (err instanceof ApiError){
		res.status(err.code).json(err.message);
		return
	}
	errorNotifier(process.env.SERVER_ADMIN_EMAIL, err.err.stack)
	logger.info("The error is:", err.err.stack)
	res.status(500).json('Something went wrong')
}

module.exports = apiErrorHandler;