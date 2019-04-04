var router = require('express').Router();
var con = require('../db/sql')
router.post('/getassignment',function(req,res){
  const Courselist  = require('../models/Courses');

    var courseid = req.body.courseid
    console.log(courseid)
   
    Courselist.find({courseid:req.body.courseid}, {_id:0, assignments: 1}, (err, results) => {
      if(err){
        console.log("Error finding mongo results for assignments");
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })
        res.end("Error finding mongo results for assignments");
    }
     else {
       console.log("assignment results",results[0].assignments)
       res.end(JSON.stringify(results[0].assignments))
     }
    })

    })
    router.post('/getassignmentdet',function(req,res){
      const Courselist  = require('../models/Courses');
  
      Courselist.find({courseid:req.body.courseid,"assignments.assignmentid":req.body.assignmentid}, {_id:0, assignments: 1}, (err, results) => {
        if(err){
          console.log("Error finding mongo results for announcements");
          res.writeHead(400, {
              'Content-Type': 'text/plain'
          })
          res.end("Error finding mongo results for announcements");
      }
       else {
         
         arr = results[0].assignments
         console.log("inarray",arr)
         arr.forEach(function(assignment){
          console.log(assignment)
          if(assignment.assignmentid==req.body.assignmentid){
            res.end(JSON.stringify([assignment]))
          }
         })
        
       }
      })
    })
    module.exports=router