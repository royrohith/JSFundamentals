const os = require('os');

//Platform 
console.log(os.platform());

//CPU Architecture
console.log(os.arch());

//CPU Cores
//console.log(os.cpus());

//Memory
console.log(os.totalmem());
console.log(os.freemem());

//Uptime
console.log((os.uptime())/3600);

//Home dir
console.log(os.homedir());