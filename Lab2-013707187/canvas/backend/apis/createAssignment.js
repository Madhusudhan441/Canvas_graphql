var router = require('express').Router();
var con = require('../db/sql')
router.post('/createassignment',function(req,res){
    console.log(req.body)
    

  const Courselist  = require('../models/Courses');
  Courselist.find({courseid:req.body.courseid}, {_id:0, assignments: 1}, (err, results) => {
    
    if(err){
      console.log("Error finding mongo results for assignments");
      res.writeHead(400, {
          'Content-Type': 'text/plain'
      })
      res.end("Error finding mongo results for assignments");
  }
   else {
     console.log(results)
     arr = results[0].assignments
     console.log("array",arr)
    if(arr.length>0){
     var max_id = arr[arr.length-1].assignmentid
    }
    else{
      var max_id = 0
    }
     console.log("max_id",parseInt(max_id)+1)
     console.log(results[0].assignments)

    Courselist.findOneAndUpdate({
      courseid: req.body.courseid
    }, {
      $push: {
          assignments: {
            assignmentid: parseInt(max_id) + 1 ,
            name: req.body.asgmnt_name,
            due:req.body.asgmnt_due,
            marks: req.body.asgmnt_marks,
            anct_date: req.body.anct_date
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
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
        })
      console.log("assignment created successfully")
        res.end();
      }
    
    });

  }

  })
  //   con.query("INSERT INTO  assignmentlist(name,due,marks,courseid) VALUES(?,?,?,?)",[req.body.asgmnt_name,req.body.asgmnt_due,req.body.asgmnt_marks,req.body.courseid], function (err, result, fields) {
  //     if (err) console.log(err)
  // });

  });

  module.exports=router
