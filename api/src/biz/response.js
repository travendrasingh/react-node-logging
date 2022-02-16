var logger = require('../../WinstonLogger');
require('dotenv').config();

exports.Response = function(res, status, error, data) {
	if(status === 400) {
		logger.error(data);
		if(process.env.DEVELOPMENT) {
			console.log(data);
		}
	}
	res.json({
		status,
		error,
		data
	});
}