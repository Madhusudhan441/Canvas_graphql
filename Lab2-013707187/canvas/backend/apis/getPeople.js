var router = require('express').Router();
var con = require('../db/sql')
var kafka = require('../kafka/client');

router.post('/getpeople',function(req,res){

  kafka.make_request('getpeople', req.body, function(err, results){
    if(results){
      if(results.length>0){
        console.log("results",results[0].studentsregistered)
        res.end(JSON.stringify(results[0].studentsregistered))
         }
      else{
        console.log("Error finding mongo results for People Details");
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })
        res.end("Error finding mongo results for People Details");
      }
    }
    else{
     res.writeHead(400, {
       'Content-Type': 'text/plain'
   })
   res.end("Error finding mongo results for People Details");
    }
  })
    console.log(req.body)
  
    //     const Courselist  = require('../models/Courses');
        
    //       Courselist.find({courseid:req.body.courseid}, {_id:0, studentsregistered: 1}, (err, results) => {
    //         if(err){
    //           console.log("Error finding mongo results for studentsregistered");
    //           res.writeHead(400, {
    //               'Content-Type': 'text/plain'
    //           })
    //           res.end("Error finding mongo results for studentsregistered");
    //       }
    //        else {
    //          if(results.length>0){
    //          console.log("results",results[0].studentsregistered)
    //          res.end(JSON.stringify(results[0].studentsregistered))
    // //     con.query("SELECT * FROM studentcourses WHERE courseid ="+req.body.courseid, function (err, result, fields) {
    // //       if (err) console.log(err);
    // //       console.log(  result)
         
    // //       res.end(JSON.stringify(result))
    
    // //   });
    //          }
    //         }
    //   })

    })

      module.exports=router