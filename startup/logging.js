
const winston = require('winston')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    // defaultMeta: { service: 'monlook' },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });
  
  logger.exitOnError = false;

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }

winston.exceptions.handle(
    new winston.transports.File({filename: 'uncaughtExceptins.log'})
)

process.on('unhandledRejection', (ex) => {
    throw ex
})

module.exports = logger