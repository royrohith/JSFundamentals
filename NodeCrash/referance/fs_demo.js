const fs = require('fs');
const path = require('path');

//Create Folder
// fs.mkdir(path.join(__dirname, 'test'),{}, err => {
//     if (err) throw err;
//     console.log('Folder Created');
// })

//Create and write to a file
// fs.writeFile(path.join(__dirname, 'test', 'Hello.txt'),'hello world!', err => {   //always overwrites
//     if (err) throw err;

//     fs.appendFile(path.join(__dirname, 'test', 'Hello.txt'),'I love node JS!', err => {   //appends text ..callback since .writeFile() is async
//         if (err) throw err;
//         console.log('Text appended');
//     })
//     console.log('File Created');
// })

//Read a file
// fs.readFile(path.join(__dirname, 'test', 'Hello.txt'), 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })

//Renaming a file
fs.rename(path.join(__dirname, 'test', 'Hello.txt'),path.join(__dirname, 'test', 'helloWorld.txt'), err => {
    if (err) throw err;
    console.log('File Renamed.');
})
