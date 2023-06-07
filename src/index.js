const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myconnection = require('express-myconnection');
const cookieParser = require('cookie-parser')

//iniciarlizarse
const app = express();
const { urlencoded } = require('express');

//Settings
app.set('port', process.env.PORT || 8080);
app.set('views engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//Middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(myconnection(mysql, {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: 3306,
    database: 'gamersite'
}, 'single'));

app.use(express.urlencoded({ extended: false }));

//Routes
app.use(require('./routes'));

//static files
app.use(express.static(path.join(__dirname, 'public')))

//Start Server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});