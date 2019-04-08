
var router = require('express').Router();
var con = require('../db/sql')
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false});

router.post('/getprofile',requireAuth,function(req,res){
  console.log("header",req.header)
  const Facultydetails  = require('../models/Facultydetails');
  
    if(req.body.stufac==="faculty"){
      console.log("iddd",req.body.id)
      Facultydetails.find({facultyid:req.body.loginid}, (err, results) => {
        if(err){
          console.log("Error finding mongo results for profile details");
          res.writeHead(400, {
              'Content-Type': 'text/plain'
          })
          res.end("Error finding mongo results for Job Applications");
      }
       else {
         console.log("profile details retrieved".results)
         res.end(JSON.stringify(results))

       }

      })
    


      // con.query("SELECT *  FROM facultydetails WHERE facultyid = "+JSON.stringify(req.body.loginid), function (err, result, fields) {
      //   if (err) {
      //   console.log(err)
      //   }
      //  res.end(JSON.stringify(result))
      // })
    }
    else{
 const StudentLogin  = require('../models/Studentdet');

 StudentLogin.find({studentid:req.body.loginid}, (err, results) => {
        if(err){
          console.log("Error finding mongo results for profile details");
          res.writeHead(400, {
              'Content-Type': 'text/plain'
          })
          res.end("Error finding mongo results for Job Applications");
      }
       else {
         console.log("profile details retrieved".results)
         res.end(JSON.stringify(results))

       }

      })
      // con.query("SELECT *  FROM studentdet WHERE studentid ="+JSON.stringify(req.body.loginid), function (err, result, fields) {
      //   if (err){console.log(err)};
      //   res.end(JSON.stringify(result))
      // })
    }
        
  })
  module.exports=router


