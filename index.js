const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { databaseConection } = require('./databases/config');

// * Express Init
const app = express();

// * Cors
app.use(cors());

// !DB CONNECTION
databaseConection();

// ? Public directory
app.use(express.static('public'));

// * Parsing json response
app.use(express.json());

// ! ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/', require('./routes/calendar-events'));

// ! this shortcut is just in case the build react app is inside of Public folder 
// app.get('*', (req, resp) => { 
//     resp.sendFile(__dirname + '/public/index.html');
// })
// * RUNNING PORT
app.listen(process.env.PORT, () => { 
    console.log(` server running on port ${process.env.PORT}`)
})