
var router = require('express').Router();
var con = require('../db/sql')
      router.post('/quizsub',function(req,res){
        console.log("inside subquiz")
        var score = 0
      //   con.query("SELECT quizquesid,quizopted FROM quizques WHERE quizid = "+JSON.stringify(req.body.quizid), function (err, result, fields) {
      //     if (err) console.log(err);
           
      //     result.filter(function(quizques){
      //       console.log(quizques)
      //     req.body.dataque.filter(function(quizans){
      //       console.log(quizans.name,quizans.value,quizques.quizquesid,quizques.quizopted)
      //       if(quizans.name==quizques.quizquesid && quizans.value==quizques.quizopted){
      //           score = score + 1
      //       } 
      //     })
      //     })
      //     console.log(score,req.body.courseid,req.body.loginid) 
      //     con.query("INSERT INTO grades(studentid,courseid,assignmentid,score) VALUES(?,?,?,?)",[req.body.loginid,req.body.courseid,req.body.quizid,score], function (err, result, fields) {
      //       if (err){
      //         console.log(err)
      //       } 
      //   });
      //   con.query("UPDATE  quiz SET quiztaken ='yes' WHERE quizid = "+JSON.stringify(req.body.quizid)+" and courseid="+JSON.stringify(req.body.courseid), function (err, result, fields) {
      //     if (err) console.log(err);
      //     console.log(result.affectedRows + " record(s) updated");
      // });
      //   })
        res.end();
      });
      module.exports=router