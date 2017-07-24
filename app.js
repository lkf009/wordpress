var express = require('express');
var ejs = require('ejs');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debugFactory = require('debug');
debugFactory.enable('wordpress');
var debug = debugFactory('wordpress');
var routes = require('./routes/index');
var flash = require('connect-flash');
var session = require('express-session');
var settings = require('./settings');

var app = express();

app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'dist/html'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(flash());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));
app.use(session({
    secret: settings.cookieSecret,
    key: settings.db,//cookie name
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
}));

routes(app);

app.listen(app.get('port'), function() {
    //console.log('Express server listening on port' + app.get('port'));
    debug('wordpress server listening on port' + app.get('port'));
});