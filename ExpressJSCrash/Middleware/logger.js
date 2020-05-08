const moment = require('moment');   //installed from npm
//Middleware function
const logger = (req, res, next) => {
    console.log('Request Send to ...')   //logs to console everytime a request is made
    console.log(`${req.protocol}//${req.get('host')}${req.originalUrl} at ${moment().format()}`);
    next();                              //crucial to move to next midlleware function
}

module.exports = logger; 