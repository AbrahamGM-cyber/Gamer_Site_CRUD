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
    host: 'bnlaaox1boalnkpet9bx-mysql.services.clever-cloud.com',
    user: 'uvqbbmuh71wargnx',
    password: 'mnyh2R5ydFputN00kqNs',
    port: 3306,
    database: 'bnlaaox1boalnkpet9bx'
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