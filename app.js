var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//connect to Mongoose
mongoose.connect('monodb:://mongodb://127.0.0.1:27017/authentication');
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    //connected to db
});

//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// serve static files
app.use(express.static(__dirname+'/templates'));


//include routes
var routes = require('./routes/router');
app.use('/', routes);

//catch 404 and forward to error handlers
app.use(function(req,res){
    var err = new Error('file not found');
    err.status = 404;
    next(err);
});

//error handler
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.send(err.message);
});

//listen on port 3000
app.listen(3000, function(){
    console.log('Express app listening on port 3000');
})
