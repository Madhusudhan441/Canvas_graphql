var mongoose = require('mongoose')
var mongoose = require('mongoose');
//var configLink=require('./../config');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://admin:admin@cluster0-shard-00-00-9vb82.mongodb.net:27017,cluster0-shard-00-01-9vb82.mongodb.net:27017,cluster0-shard-00-02-9vb82.mongodb.net:27017/canvas?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",{useMongoClient: true});
var mdb=mongoose.connection;

mdb.on('error',console.error.bind(console,'Connection error'))
mdb.on('open',()=>{
    
    console.log('MongoDB connected!')
})

const user = new mongoose.Schema({
  studentid: {
    type: String,
    required: [true, 'Studentid is required']
  },
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  password: {
    type: String,
    required: [true, 'password is required,']
  },
  name: {
    type: String
    // required: [true, 'password is required,']
  },
  email: {
    type: String
    // required: [true, 'password is required,']
  },
  phonenumber: {
    type:Number
    // required: [true, 'password is required,']
  },
  about: {
    type:String
    // required: [true, 'password is required,']
  },
  city: {
    type:String
    // required: [true, 'password is required,']
  },
  country: {
    type:String
    // required: [true, 'password is required,']
  },
  company: {
    type:String
    // required: [true, 'password is required,']
  },
  school: {
    type:String
    // required: [true, 'password is required,']
  },
  hometown: {
    type:String
    // required: [true, 'password is required,']
  },
  languages: {
    type:String
    // required: [true, 'password is required,']
  },
  gender: {
    type:String
    // required: [true, 'password is required,']
  },
  messages:[{
studentid:{
  type:String
},
messagecontent:[{
  studentname:{
    type:String
  },
  message:{
    type:String
  }
}]
}
  ],
  studentcourses:[
    {
     
      courseid:{
        type:String
      },
      coursename:{
        type:String
      },
      coursecol:{
        type:String
      },
      coursestatus:{
        type:String
        
      }
    }
  ],
  grades:[
    {
     
      courseid:{
        type:String        
      },
      assignmentid:{
        type:String   
      },
      score:{
        type:Number   
      }

    }
  ]

},{strict:"false"})
var Studentdet = mongoose.model('studentdets',user);
module.exports = Studentdet;

 // name:""
    // email:"",
    // phonenumber:"",
    // about:"",
    // city:"",
    // country:"",
    // company:"",
    // school:"",
    // hometown:"",
    // languages:"",
    // gender:"",

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
