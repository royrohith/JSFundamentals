const http = require('http');
const path = require('path');
const fs = require('fs');
//Creating Server
const server = http.createServer((req, res) => {

    // if(req.url === '/'){                           //check whether in the index page
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
    //         if(err) throw err;
    //         res.writeHead(200, {'Content-Type': 'text/html'});    //writes to response header Content-Type with status code: 200
    //         res.end(content);
    //      })
    
    // }
    // if(req.url === '/api/users'){
    //     const users = [
    //         {name: 'John Wick', age: 32},
    //         {name: 'James Bond', age: 33 }
    //     ];    //mimics database
    //     res.writeHead(200, {'Content-Type': 'application/json'});
    //     res.end(JSON.stringify(users));
    // }

    //Build dynamic filepath
    let filepath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    console.log(filepath);
    
    //Get extension
    let ext = path.extname(filepath);

    //Check extension
    let contentType = 'text/html';
    switch(ext) {
        case '.js': 
        contentType = 'text/javascript';
        break;
        case '.css': 
        contentType = 'text/css';
        break;
        case '.json': 
        contentType = 'application/json';
        break;
        case '.png': 
        contentType = 'image/png';
        break;
        case '.jpeg': 
        contentType = 'image/jpeg';
        break;
    }
    // Check if contentType is text/html but no .html file extension  **important**
    if (contentType == "text/html" && ext == "") filepath += ".html";
    console.log(filepath);

    //reads (loads) file corresponding to filepath
    fs.readFile(filepath, (err, content) => {     
        if(err){
            //Not Found Error
            if(err.code === 'ENOENT'){
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content, 'utf8');
                });
            } else {
                //Some Server Error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        }
        else {
            //Success
            res.writeHead(200, {'Content-Type': contentType});  //adds content type to Content-Type header
            res.end(content, 'utf8');    //loads the html file
        } 
    })
});
//Creating port
const PORT = process.env.PORT || 5000;  //env (environment variable) decides which port to run ie not always 5000
server.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`));