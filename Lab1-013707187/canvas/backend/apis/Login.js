var router = require('express').Router();
var con = require('../db/sql')
var bcrypt = require('bcrypt');

router.post('/login',function(req,res){
    console.log("Inside Login Post Request");
    //console.log("Req Body : ", username + "password : ",password);
    // console.log("Req Body : ",req.body);
    console.log(req.body)
   if(req.body.stufac==="faculty"){
    const FacultyLogin  = require('../models/Facultydetails');
    FacultyLogin.findOne({
        facultyid: req.body.username
    }, function (err, user) {
         if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.code = "200";
                res.value = user;
                console.log(res.value);
                // Create token if the password matched and no error was thrown
                // var token = jwt.sign({ user }, config.secret, {
                //     expiresIn: 10080 // in seconds
                // });
                // console.log(token + "Inside token")
                res.cookie('ccookie', "user", { maxAge: 900000, httpOnly: false, path: '/' });

                res.status(200).json({ success: true, email : req.body.username, cookie:"user"});
            }
            else {
                res.code = "406";
                res.value = "Invalid password";
                console.log(res.value);
                res.sendStatus(406).end();
            }
        }
        else{
            
                res.code = "400";
                res.value = "The Student id entered is invalid. Please try again.";
                console.log(res.value);
                res.sendStatus(400).end();
           
        }
    })

   }
   else{
       
 const StudentLogin  = require('../models/Studentdet');
    
    StudentLogin.findOne({
        studentid: req.body.username
    }, function (err, user) {
         if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.code = "200";
                res.value = user;
                console.log(res.value);
                // Create token if the password matched and no error was thrown
                // var token = jwt.sign({ user }, config.secret, {
                //     expiresIn: 10080 // in seconds
                // });
                // console.log(token + "Inside token")
                res.cookie('ccookie', "user", { maxAge: 900000, httpOnly: false, path: '/' });

                res.status(200).json({ success: true, email : req.body.username, cookie:"user"});
            }
            else {
                res.code = "406";
                res.value = "Invalid password";
                console.log(res.value);
                res.sendStatus(406).end();
            }
        }
        else{
            
                res.code = "400";
                res.value = "The email id entered is invalid. Please try again.";
                console.log(res.value);
                res.sendStatus(400).end();
           
        }
    })

   }
  }); 
  
  module.exports=router