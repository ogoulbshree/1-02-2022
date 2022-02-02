// let Defaults = require('../utils/Defaults');
const log4js = require('log4js');


log4js.configure({
    appenders: { CRMlog: { type: 'file', filename: 'CRMlog.log' }, console: { type: 'console' } },
    categories: { default: { appenders: ['CRMlog', 'console'], level: 'debug' } }
});

let logger = log4js.getLogger('CRMlog');
//logger.setLevel('DEBUG');

class Logger {
    constructor() { }

    static success(req, res, params) {
        logger.info('Success: ' + req.method + ' ' + req.originalUrl + '\n for props: ' + JSON.stringify(params));
    }

    static log(req, res, message) {
        logger.info(message + " from " + req.originalUrl + ':' + req.method)
    }

    static error(req, res, params, error) {
        logger.error('Error: ' + req.method + ' ' + req.originalUrl + '\n for props: ' + JSON.stringify(params) + '\n Error Details: ' + error + '\n' + error.stack);
    }

    /////////////////////////// MHS
    static logString(message) {
        logger.debug("\n##### " + message + " #####");
    }
    static logObj(obj) {
        // logger.debug("######################");
        logger.debug(obj);
    }
    static logStringWithObj(message, obj) {
        logger.debug("\n##### " + message + " #####");
        logger.debug(obj);
    }
    static logErrorStringWithObj(message, obj) {
        logger.debug("\n##### ERROR: " + message + " #####");
        logger.debug(obj);
    }

    static logSuccessEvent(message, obj) {
        logger.debug("\n##### " + message + " #####");
        logger.debug(obj);
    }

    
  
  

  
   

    ////////////////////
}

module.exports = Logger;