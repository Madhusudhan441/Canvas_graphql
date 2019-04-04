
var router = require('express').Router();
var con = require('../db/sql')
router.post('/updateprofile',function(req,res){
    console.log("hi",req.body)
    if(req.body.stufac==="faculty"){
      con.query("UPDATE facultydetails SET name = ?,email =?,phonenumber =?,about = ?,city =?,country =?,company = ?,school =?,hometown =?,languages =?,gender = ? WHERE facultyid = ?",[req.body.name,req.body.email,req.body.phonenumber,req.body.about,req.body.city,req.body.country,req.body.company,req.body.school,req.body.hometown,req.body.languages,req.body.gender,req.body.loginid],function (err, result, fields) {
        if (err) console.log(err);
      
        res.end(JSON.stringify(result))
      })
    }
    else{
      con.query("UPDATE studentdet SET name = ?,email =?,phonenumber =?,about = ?,city =?,country =?,company = ?,school =?,hometown =?,languages =?,gender = ? WHERE studentid = ?",[req.body.name,req.body.email,req.body.phonenumber,req.body.about,req.body.city,req.body.country,req.body.company,req.body.school,req.body.hometown,req.body.languages,req.body.gender,req.body.loginid],function (err, result, fields) {
        if (err) console.log(err);
        res.end(JSON.stringify(result))
      })
    }
      })
      module.exports=router