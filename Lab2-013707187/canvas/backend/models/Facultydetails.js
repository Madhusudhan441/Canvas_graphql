var mongoose = require('mongoose')

const faculty = new mongoose.Schema({
  _id: {type: String},

  facultyid: {
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
  }
})
var Facultydet = mongoose.model('facultydetails',faculty);
module.exports = Facultydet;

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
