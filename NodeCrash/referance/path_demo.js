const path = require('path');

//Base filename
console.log(__filename);   //entire directory along with base file name
console.log(path.basename(__filename));   //only base filename

//Directory only
console.log(path.dirname(__filename)); 

//File extension
console.log(path.extname(__filename));

//Create path object with all the above
console.log(path.parse(__filename));

//Concatenate paths
console.log(path.join(__dirname,'New Folder','index.html'));