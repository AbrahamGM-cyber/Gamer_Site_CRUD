const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path')

//iniciarlizarse
const app = express();

//Settings
app.set('port', process.env.PORT || 8080);
app.set('views engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//Middlewares
app.use(morgan('dev'));

//Routes
app.use(require('./routes'));

//static files
app.use(express.static(path.join(__dirname, 'public')))

//Start Server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});