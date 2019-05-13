var router = require('express').Router();
var con = require('../db/sql')
var passport = require('passport');
var kafka = require('../kafka/client');


var requireAuth = passport.authenticate('jwt', {session: false});

router.post('/getannounce',requireAuth,function(req,res){

  kafka.make_request('getannounce', req.body, function(err, result){

 if(result){
   if(result.length>0){
    console.log("announcement results",result[0].announcements)
    res.end(JSON.stringify(result[0].announcements))
   }
   else{
    res.writeHead(400, {
      'Content-Type': 'text/plain'
  })
  res.end("Error finding mongo results for announcements");
   }
 }
 else{
  res.writeHead(400, {
    'Content-Type': 'text/plain'
})
res.end("Error finding mongo results for announcements");
 }

  
})
})
  //     con.query("SELECT * FROM announcements WHERE courseid ="+courseid, function (err, result, fields) {
  //       if (err) console.log(err);
  //       res.end(JSON.stringify(result))
  //   });
  // })
  router.post('/getannouncedet',requireAuth,function(req,res){
  const Courselist  = require('../models/Courses');

  kafka.make_request('getannouncedet', req.body, function(err, results){

    if(results){
      if(results.length>0){
        arr = results[0].announcements
        console.log("inarray",arr)
        arr.forEach(function(announce){
         console.log(announce)
         if(announce.anct_id==req.body.anct_id){
           res.end(JSON.stringify([announce]))
         }
        })
      }
      else{
       res.writeHead(400, {
         'Content-Type': 'text/plain'
     })
     res.end("Error finding mongo results for announcements");
      }
    }
    else{
     res.writeHead(400, {
       'Content-Type': 'text/plain'
   })
   res.end("Error finding mongo results for announcements");
    }
   
     
   })
  

    // Courselist.find({courseid:req.body.courseid,"announcements.anct_id":req.body.anct_id}, {_id:0, announcements: 1}, (err, results) => {
    //   if(err){
    //     console.log("Error finding mongo results for announcements");
    //     res.writeHead(400, {
    //         'Content-Type': 'text/plain'
    //     })
    //     res.end("Error finding mongo results for announcements");
    // }
    //  else {
       
    //    arr = results[0].announcements
    //    console.log("inarray",arr)
    //    arr.forEach(function(announce){
    //     console.log(announce)
    //     if(announce.anct_id==req.body.anct_id){
    //       res.end(JSON.stringify([announce]))
    //     }
    //    })
      
    //  }
    // })
  //   con.query("SELECT * FROM announcements WHERE courseid ="+req.body.courseid+" AND anct_id="+req.body.anct_id, function (err, result, fields) {
  //     if (err) console.log(err);
  //     res.end(JSON.stringify(result))
  // });
})
  module.exports=router
