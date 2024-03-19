'use strict';

const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

const sessionMiddleware = require('./middlewares/sessionMiddleware');


let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let adsRouter = require('./routes/ads');



///////////////////////
const db = require('./models/index');
// createt the tables if dont exist
db.sequelize.sync()
    .then(() => {
      console.log('Database Synced.');
      return Promise.all([
          db.User.findOrCreate({
            where: {login: 'admin'},
            defaults: {login: 'admin', password: 'admin', accessLevel: 1}
          }),
        db.User.findOrCreate({
          where: {login: 'admin2'},
          defaults: {login: 'admin2', password: 'admin2', accessLevel: 1}
        }),
        db.Ad.findOrCreate({
            where: {title: "Example1"},
            defaults: {title: "Example1", description: "description example.", price: 100,
            phone: "02-6517289", email: "example@example.com"},
            isApproved: false
        })
      ]);
    }).then(() => {
        console.log('Admin user created.');
    }).catch((err) => {
        console.log('Error syncing datebase or creating admin users.');
        console.log(err);
    });

// enable sessions
app.use(session({
    secret:"ourSecretSource",
    resave: false, // Force save of session for each request
    saveUninitialized: false, // Save a session that is new, but has not been modified
    //cookie: { maxAge: 2 * 60 * 1000 }
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to set session data
app.use(sessionMiddleware);

/* my routes */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', adsRouter);

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
