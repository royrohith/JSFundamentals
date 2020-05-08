const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./Middleware/logger');
const members = require('./Members');

//Initialize express
const app = express();

//Route Hander
// app.get('/', (req, res) => {
//     res.send('<h2>Hello World!</h2>'); //or
//     res.sendFile(path.join(__dirname, 'public','index.html' ));
// });

//Init Middleware (userdefined ex)
app.use(logger);

//Handlebars Middleware
app.engine('handlebars', exphbs());      //in github documentation
app.set('view engine', 'handlebars');

//Body Parser Middleware
app.use(express.json());                        //parsing raw json data
app.use(express.urlencoded({extended: false})); //parse form submission



//Homepage Route
app.get('/', (req, res) => res.render('index', {render: 'Rendering Members', members}));          //incase there are forms that submits to database

//Set static folder: so that no need of seperate route handlers for each page
app.use(express.static(path.join(__dirname, 'public')))

//Using Routers for similar Routes 
app.use('/api/members', require('./routes/api/members'));

//listening to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running in port: ${PORT}`));