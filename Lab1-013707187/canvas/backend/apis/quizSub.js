
var router = require('express').Router();
var con = require('../db/sql')
      router.post('/quizsub',function(req,res){
        console.log("inside subquiz")
  const Courselist  = require('../models/Courses');

        var score = 0
        Courselist.find({courseid:"258","quiz.quizid":"3"}, {_id:0, "quiz.quizques": 1}, (err, results) => {
          if(err){
            console.log("Error finding mongo results for quiz");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error finding mongo results for quiz");
        }
         else{
           console.log("results",results)
           
           arr = results[0].quiz
           console.log("inarray",arr[0].quizques,req.body.dataque)
           arr1 = arr[0].quizques

           arr1.forEach(function(quizques){
            req.body.dataque.filter(function(quizans){
                    console.log(quizans.name,quizans.value,quizques.quizquesid,quizques.quizopted)
                    console.log("name",quizans.name)
                    if(quizans.name==quizques.quizquesid && quizans.value==quizques.quizopted){
                        score = score + 1
                    } 
                  })
          
                })

            console.log("score",score)
            const StudentLogin  = require('../models/Studentdet');
    
            
    StudentLogin.findOneAndUpdate({
      studentid: req.body.loginid
    }, {
      $push: {
          grades: {
            courseid: req.body.courseid,
            assignmentid: req.body.quizid,
            score:score,
          }
      }
    }, {
      upsert: true
    }, function (err, result) {
      if (err)
          return res.send(500, {
              error: err
          });
      else{
        
      console.log("grades updated successfully")
    
      }
    
    });

          res.end(JSON.stringify(arr[0].quizques))
         }
        })
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