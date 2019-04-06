
var router = require('express').Router();
var con = require('../db/sql')
router.post('/updateprofile',function(req,res){
    console.log("hi",req.body)
    if(req.body.stufac==="faculty"){
 const Facultydetails  = require('../models/Facultydetails');

      
 Facultydetails.updateOne({
      facultyid: req.body.loginid,
    },  {
        name:req.body.name,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        about:req.body.about,
        school:req.body.school,
        city:req.body.city,
        country:req.body.country,
        company:req.body.company,
        hometown:req.body.hometown,
        language:req.body.language,
        gender:req.body.gender

        }, {
      upsert: true
    }, function (err, result) {
      if (err)
          return res.send(500, {
              error: err
          });
      else{
 console.log("profile updated")
      }
    }
 )
      // con.query("UPDATE facultydetails SET name = ?,email =?,phonenumber =?,about = ?,city =?,country =?,company = ?,school =?,hometown =?,languages =?,gender = ? WHERE facultyid = ?",[req.body.name,req.body.email,req.body.phonenumber,req.body.about,req.body.city,req.body.country,req.body.company,req.body.school,req.body.hometown,req.body.languages,req.body.gender,req.body.loginid],function (err, result, fields) {
      //   if (err) console.log(err);
      
      //   res.end(JSON.stringify(result))
      // })
    }
    else{
      const StudentLogin  = require('../models/Studentdet');

      
 StudentLogin.updateOne({
      studentid: req.body.loginid,
    },  {
        name:req.body.name,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        about:req.body.about,
        school:req.body.school,
        city:req.body.city,
        country:req.body.country,
        company:req.body.company,
        hometown:req.body.hometown,
        language:req.body.language,
        gender:req.body.gender

      }
    , {
      upsert: true
    }, function (err, result) {
      if (err)
          return res.send(500, {
              error: err
          });
      else{
 console.log("profile updated")
      }
    }
 )
      // con.query("UPDATE studentdet SET name = ?,email =?,phonenumber =?,about = ?,city =?,country =?,company = ?,school =?,hometown =?,languages =?,gender = ? WHERE studentid = ?",[req.body.name,req.body.email,req.body.phonenumber,req.body.about,req.body.city,req.body.country,req.body.company,req.body.school,req.body.hometown,req.body.languages,req.body.gender,req.body.loginid],function (err, result, fields) {
      //   if (err) console.log(err);
      //   res.end(JSON.stringify(result))
      // })
    }
      })
      module.exports=router