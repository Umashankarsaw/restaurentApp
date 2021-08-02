const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const logger = winston.createLogger({
  format: combine(
    label({ label: 'error' }),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});
 
logger.add(new winston.transports.Console({
  format:winston.format.simple(),
}))
const loggers = {
  log(message, type='error'){
    logger.log({
      level:type,
      message:message
    })
  }
}


module.exports = loggers;