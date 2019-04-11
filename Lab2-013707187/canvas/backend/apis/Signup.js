var router = require('express').Router();
var con = require('../db/sql')
  var { mongoose } = require('../db/demo');

var bcrypt = require('bcrypt');
const saltRounds = 10;
router.post('/signup',function(req,res){
 
    if(req.body.owner=="student"){
      bcrypt.hash(req.body.password, saltRounds, function (err,   hash){

//   var { mongoose } = require('./db/demo');


 const StudentLogin  = require('../models/Studentdet');

 var userSchema = new StudentLogin({
    studentid:req.body.loginid,
    username:req.body.username,
    password:hash,
    name:"",
    email:"",
    phonenumber:"",
    about:"",
    city:"",
    country:"",
    company:"",
    school:"",
    hometown:"",
    languages:"",
    gender:"",
    studentcourses:[],
    grades:[]
 });
 StudentLogin.findOne({
    studentid: req.body.loginid
}, function (err, user) {
    if (user) {
        console.log("userid already exists")
    }
    else{
        console.log("in error")
        userSchema.save().then(result =>{
            console.log(result);
          })
          .catch(err =>console.log(err));
    }
})

//  userSchema.save().then(result =>{
//    console.log(result);
//  })


//     con.query("INSERT INTO studentdet(studentid,username,password) VALUES(?,?,?)",[req.body.loginid,req.body.username,hash], function (err, result, fields) {
//       if (err){
//         console.log("User Already Exists")
//         res.sendStatus(400);
//         // res.end("User Already Exists")
//         // return res.status(500).json(err)
//       }
//         else{
//           console.log("success")
//           res.end("Signup Successful")
//         }
//   });
  })
    }
    else{
      bcrypt.hash(req.body.password, saltRounds, function (err,   hash){


        const FacultyLogin  = require('../models/Facultydetails');

        var userSchema = new FacultyLogin({
   

           facultyid:req.body.loginid,
           username:req.body.username,
           password:hash,
           name:"",
           email:"",
           phonenumber:"",
           about:"",
           city:"",
           country:"",
           company:"",
           school:"",
           hometown:"",
           languages:"",
           gender:"",
        });
        FacultyLogin.findOne({
           facultyid: req.body.loginid
       }, function (err, user) {
           if (user) {
               console.log("userid already exists")
           }
           else{
               console.log("in error")
               userSchema.save().then(result =>{
                   console.log(result);
                 })
                 .catch(err =>console.log(err));
           }
       })
       
    //   con.query("INSERT INTO facultydetails(facultyid,username,password) VALUES(?,?,?)",[req.body.loginid,req.body.username,hash], function (err, result, fields) {
    //     if (err){
    //       console.log("User Already Exists")
        
    //       res.end("User Already Exists")
    //     }
    //     else{
    //       res.end("Signup Successful")
    //     }
    // });
    })
  }
  });
  module.exports=router