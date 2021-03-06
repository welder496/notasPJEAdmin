//global token
global.__token = "";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var multer = require('multer');
var restler = require('restler');
var netConfig = require('netconfig');

var login = require('./routes/login');
var logoff = require('./routes/logoff');
var routes = require('./routes/index');
var edit = require('./routes/edit');
var contador = require('./routes/contador');
var insert = require('./routes/insert');
var searchForTags = require('./routes/searchForTags');
var searchForCodigo = require('./routes/searchForCodigo');
var searchForNota = require('./routes/searchForNota');
var documents = require('./routes/documents');
var perfil = require('./routes/perfil');
var funcionalidade = require('./routes/funcionalidade');
var version = require('./routes/version');
var help = require('./routes/help');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer({dest: './uploads/',
  rename: function(fieldname, filename){
    return filename+Date.now();
 }
}));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/login', login);
app.use('/logoff', logoff);
app.use(function(req, res, next){
    restler.get("http://"+netConfig.getHost()+':'+netConfig.getPort()+'/notas/notas/first/1',{
          accessToken: global.__token
    })
    .on('complete', function(result){
           if (result.message === "Token inválido!!") {
                 res.redirect('/login');
           } else {
                 next();
           }
    });
});
app.use('/', routes);
app.use('/index', routes);
app.use('/insert', insert);
app.use('/edit',edit);
app.use('/contador',contador);
app.use('/searchForTags', searchForTags);
app.use('/searchForCodigo', searchForCodigo);
app.use('/searchForNota', searchForNota);
app.use('/documents', documents);
app.use('/perfil',perfil);
app.use('/funcionalidade',funcionalidade);
app.use('/version',version);
app.use('/help', help);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
