const url = require('url');
const myUrl = new URL('http://mywebsite.com/hello.html?id=77&&status=active');

//Actual Url
console.log(myUrl.href);
console.log(myUrl.toString());  //same

//Host (root domain)
console.log(myUrl.host);
console.log(myUrl.hostname);   //same but hostname wont show port

//Pathname
console.log(myUrl.pathname);

//Query parameters
console.log(myUrl.search);
console.log(myUrl.searchParams);   //parameters as object
myUrl.searchParams.append('name', 'xyz');
console.log(myUrl.searchParams);