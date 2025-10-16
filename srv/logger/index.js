const log = require('cf-nodejs-logging-support');

const logs = (logLevel, logAction, logDetails) => {
  log.setLoggingLevel('info');
  if (logLevel == 'INFO') {
    log.info(`${logLevel} | [${logAction}] ${logDetails}`);
  }

  if (logLevel == 'ERROR') {
    log.error(`${logLevel} | [${logAction}] ${logDetails}`);
  }
};

module.exports = logs;