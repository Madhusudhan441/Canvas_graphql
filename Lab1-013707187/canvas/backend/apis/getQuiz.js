var router = require('express').Router();
var con = require('../db/sql')
router.post('/getquiz',function(req,res){

    var courseid = req.body.courseid
    console.log(courseid)
    var res1 = ""
    const Courselist  = require('../models/Courses');
  
    Courselist.find({courseid:req.body.courseid}, {_id:0, quiz: 1}, (err, results) => {
      if(err){
        console.log("Error finding mongo results for quiz");
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })
        res.end("Error finding mongo results for quiz");
    }
     else {
       
       arr = results[0].quiz
       console.log("inarray",arr)
       res.end(JSON.stringify(arr))
      
     }
    })
    //   con.query("SELECT * FROM quiz WHERE courseid ="+courseid, function (err, result, fields) {
    //     if (err) console.log(err);
  
       
    //     res.end(JSON.stringify(result))
  
    // });
    })

    router.post('/getquizques',function(req,res){
      const Courselist  = require('../models/Courses');
      console.log("quizid",req.body.quizid,req.body.courseid)
        var res1 = ""
        Courselist.find({courseid:"258","quiz.quizid":"1"}, {_id:0, "quiz.quizques": 1}, (err, results) => {
          if(err){
            console.log("Error finding mongo results for quiz");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error finding mongo results for quiz");
        }
         else {
           console.log("results",results)
           
           arr = results[0].quiz
           console.log("inarray",arr[0].quizques)
          //  arr.forEach(function(quiz){
          //   console.log(quiz)
          //   if(quiz.quizid==req.body.quizid){
          //     res.end(JSON.stringify([quiz]))
          //   }
          //  })
          res.end(JSON.stringify(arr[0].quizques))
         }
        })
        //   con.query("SELECT * FROM quizques WHERE quizid ="+quizid, function (err, result, fields) {
        //     if (err) console.log(err);
    
          
        //     res.end(JSON.stringify(result))
    
        // });
        })
  module.exports=router
