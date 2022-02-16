var moment = require('moment');
var appRoot = require('app-root-path');
var winston = require('winston');

const { transports, createLogger, format } = require('winston');
winston.addColors(winston.config.npm.colors);


var fs = require('fs');
var logDir = appRoot + '/public/logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
var date = moment(new Date()).format('YYYY-MM-DD');

const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'MM-YY-DD hh:mm:ss a' }),
        format.json(),
    ),
    transports: [
        new winston.transports.File({ filename: appRoot + '/public/logs/error_'+date+'.log', level: 'error' })
    ]
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

module.exports = logger;