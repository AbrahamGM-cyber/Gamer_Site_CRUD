const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myconnection = require('express-myconnection');
const cookieParser = require('cookie-parser');
const sesion = require('express-session')
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

//iniciarlizarse
const app = express();
const { urlencoded } = require('express');
require('./lib/passport')

//Settings
app.set('port', process.env.PORT || 8080);
app.set('views engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//Middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'gamer_site'
}));

//Sesion
app.use(sesion({
    secret: 'new-sesion',
    resave: true,
    saveUninitialized: true
}));

//BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//flash
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.message = req.flash('message');
    next();
});
//passport

app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({ extended: false }));

//Routes
app.use(require('./routes'));


//static files
app.use(express.static(path.join(__dirname, 'public')))

//Start Server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});