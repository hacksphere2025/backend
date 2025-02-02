import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(),
    customFormat
  ),
  transports: [
    new transports.Console({
      format: printf(({ level, message, timestamp, stack }) => {
        return stack
          ? `${timestamp} [${level}]: ${message}  \nStack Trace:  ${stack}`
          : `${timestamp} [${level}]: ${message}`;
      })
    })
  ]
});

export default logger;