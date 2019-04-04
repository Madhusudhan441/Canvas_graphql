var router = require('express').Router();
var con = require('../db/sql')
      router.post('/createquiz',function(req,res){
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
          console.log(results)
          arr = results[0].quiz
          console.log("array",arr)
         if(arr.length>0){
          var max_id = arr[arr.length-1].quizid
         }
         else{
           var max_id = 0
         }
          console.log("max_id",parseInt(max_id)+1)
         }
    var quesarr = req.body.quesdet
    var arr1 = []
    quesarr.forEach(quiz => {
      arr1.push(
        {
                      "quizquesid":"1",
                      "quizname":quiz.quizname,
                      "quizquestion":quiz.quizquestion,
                      "quizopt1":quiz.quizopt1,
                      "quizopt2":quiz.quizopt2,
                      "quizopt3":quiz.quizopt3,
                      "quizopt4":quiz.quizopt4,
                      "quizans":"",
                      "quizopted":quiz.quizopted
                    }
      )
    //   Courselist.findOneAndUpdate({
    //     courseid: req.body.courseid,
    //     "quiz.quizid":parseInt(max_id) + 1 
    //   }, {
    //     upsert: true
    //   } ,{
    //     $push: {
    //         quiz: {
    //           quizques:[{
    //             "quizid":"1",
    //             "quizname":quiz.quizname,
    //             "quizquestion":quiz.quizquestion,
    //             "quizopt1":quiz.quizopt1,
    //             "quizopt2":quiz.quizopt2,
    //             "quizopt3":quiz.quizopt3,
    //             "quizopt4":quiz.quizopt4,
    //             "quizans":"",
    //             "quizopted":quiz.quizopted
    //           }]
    //         }
    //     }
    //   }, {
    //     upsert: true
    //   }, function (err, result) {
    //     if (err)
    //         return res.send(500, {
    //             error: err
    //         });
    //     else{
         
    //     console.log("quiz created successfully")
         
    //     }
      
    //   });
    });
    console.log("coursedet",quesarr)
    Courselist.findOneAndUpdate({
      courseid: req.body.courseid
    }, {
      $push: {
          quiz: {
            quizid: parseInt(max_id) + 1 ,
            name: req.body.quizname,
            due:req.body.quizdue,
            marks: req.body.quizmarks,
           
            quiztaken:"no",
            quizques:arr1
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
     
      console.log("quiz created successfully")
        
      }
    
    });
    
    res.writeHead(200,{
      'Content-Type' : 'text/plain'
    })
    res.end();



        })

  //       console.log(req.body)
  //       con.query("SELECT MAX(quizid) as mx from quiz",function (err, result, fields) {
  //         console.log(result)
  //         if (err) console.log(err);
  //     if(result[0].mx<1000){
  //       maxid = 1000
  //     }
  //     else{
  //       maxid =  parseInt(result[0].mx)+1
  //       maxqueid = maxid*10
  //     }
  //     console.log(maxid)
  //       con.query("INSERT INTO quiz(quizid,courseid,name,due,marks,quiztaken) VALUES(?,?,?,?,?,?)",[maxid,req.body.courseid,req.body.quizname,req.body.quizdue,req.body.quizmarks,"no"], function (err, result, fields) {
  //         if (err) console.log(err);
  //     });
      
  //     console.log(req.body.quesdet)
  //   req.body.quesdet.filter(function(quizdet){
  //     con.query("INSERT INTO quizques(quizid,quizquesid,quizname,quizquestion,quizopt1,quizopt2,quizopt3,quizopt4,quizopted) VALUES(?,?,?,?,?,?,?,?,?)",[maxid,maxqueid,req.body.quizname,quizdet.question,quizdet.option1,quizdet.option2,quizdet.option3,quizdet.option4,quizdet.crctans], function (err, result, fields) {
  //       if (err) console.log(err);
  //   });
  //   });
  // });
      });


      module.exports=router