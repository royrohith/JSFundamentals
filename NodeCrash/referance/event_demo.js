const EventEmitter = require('events');

//inherits events module to new class
class MyEmitter extends EventEmitter{}

//Init class
const myemitter = new MyEmitter();
//Event listener
myemitter.on('abc', (data) => {
    console.log(data);
})

//Emitting Event
myemitter.emit('abc', 'event emitted!');   //whenever 'abc' is emitted eventlistener invoked
//myemitter.emit('abc');   //Note: 'abc' is not some keyword just a example to understand