var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
var multer = require('multer');
var fs = require('fs');
const path = require('path');
var con = require('./db/sql')
var bcrypt = require('bcrypt');
var config = require('./config/settings');
var jwt = require('jsonwebtoken');
var passport = require('passport');


 


// var crypt = require('./app/crypt');
// var db = require('./app/db');
var requireAuth = passport.authenticate('jwt', {session: false});


// // Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(cors());

// Log requests to console
// app.use(morgan('dev'));
require('./config/passport')(passport);

console.log("here");
//require('./app/routes')(app);
app.use(passport.initialize());
app.use(passport.session());
// Bring in defined Passport Strategy




//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(cors({ origin: 'D:/273/273_labs/canvas/frontend/src/components/submission/', credentials: true }));
app.use(session({//use express session to maintain session data
  secret: 'secret',
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration: 5 * 60 * 1000
}));

app.use(bodyParser.json());

app.use(function (req, res, next) {//Allow Access Control
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});




//   var { mongoose } = require('./db/demo');


//  const UserSchema  = require('./models/schema');

//  var userSchema = new UserSchema({
//    username:"sai",
//    password:"sai"
//  });
//  userSchema.save().then(result =>{
//    console.log(result);
//  })
//  .catch(err =>console.log(err));



var login = require('./apis/Login');
var Signup = require('./apis/Signup');
var files = require('./apis/files');
var assignment_files = require('./apis/assignment_files');
var courseSearch = require('./apis/courseSearch');
var getAssignment = require('./apis/getAssignment');
var createAnnounce = require('./apis/createAnnounce');
var createAssignment = require('./apis/createAssignment');
var getPeople = require('./apis/getPeople');
var updateProfile = require('./apis/updateProfile');
var createQuiz = require('./apis/createQuiz');
var quizSub = require('./apis/quizSub');
var getProfile = require('./apis/getProfile');
var addCourse = require('./apis/addCourse');
var getQuiz = require('./apis/getQuiz');
var gradeSearch = require('./apis/gradeSearch');
var seeFolders = require('./apis/seeFolders');
var getAnnounce = require('./apis/getAnnounce');
var requestPermission = require('./apis/requestPermission');
var getCourses = require('./apis/getCourses');
var regCourse = require('./apis/regCourse');
var getStudents = require('./apis/getStudents')
var getMessages = require('./apis/getMessages')
var sendmessage = require('./apis/sendmessage')
var getprofessors = require('./apis/getprofessors')
var generatepermissioncodes = require('./apis/generatepermission')
var updategrades = require('./apis/updategrades')
generatepermissioncodes


app.use('/', login)
app.use('/', Signup)
app.use('/', files)
app.use('/', assignment_files)
app.use('/', courseSearch)
app.use('/', getAssignment)
app.use('/', createAnnounce)
app.use('/', createAssignment)
app.use('/', getPeople)
app.use('/', updateProfile)
app.use('/', createQuiz)
app.use('/', quizSub)
app.use('/', getProfile)
app.use('/', addCourse)
app.use('/', getQuiz)
app.use('/', gradeSearch)
app.use('/', seeFolders)
app.use('/', getAnnounce)
app.use('/', requestPermission)
app.use('/', getCourses)
app.use('/', regCourse)
app.use('/',getStudents)
app.use('/',getMessages)
app.use('/',sendmessage)
app.use('/',getprofessors)
app.use('/',generatepermissioncodes)
app.use('/',updategrades)




// courseresult=[]
app.listen(3001);
console.log("Server Listening on port 3001");
module.exports = app;
