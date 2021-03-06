var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var indexRouter = require('./server/routes/index');
var videoRoomRouter = require('./server/routes/videoRoomRouter');
var chatRoomRouter = require('./server/routes/chatRoomRouter');
//var videoSocket=require('./server/models/videoSocket');
//var chatSocket=require('./server/models/chatSocket');
var app = express();
var userRouter= require('./server/routes/userRouter');
var clinicRouter=require('./server/routes/getMedicalRouter');
var lineNotifyRouter=require('./server/routes/lineNotifyRouter');
var reserveRouter=require('./server/routes/reserveRouter');
var recordRouter=require('./server/routes/recordRouter');
var API_VERSION=process.env.ApiVersion;
const cors = require('cors');
app.use(cors());
const indexPath = __dirname + '/my-app/build/';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(indexPath));

//videoSocket;
//chatSocket;
//app.use('/', indexRouter);
app.use('/videoRoom',videoRoomRouter);
app.use('/chatRoom',chatRoomRouter);
app.use('/api/'+ API_VERSION,[userRouter,clinicRouter,lineNotifyRouter,reserveRouter,recordRouter]);
/*app.get('*', function (req,res) {
  //console.log(indexPath);
  res.sendFile(indexPath + "index.html");
});*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
