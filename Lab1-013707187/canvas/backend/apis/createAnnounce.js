var router = require('express').Router();
var con = require('../db/sql')
router.post('/createannounce',function(req,res){
  var max_id = 0
    console.log(req.body)
  const Courselist  = require('../models/Courses');
  Courselist.find({courseid:req.body.courseid}, {_id:0, announcements: 1}, (err, results) => {
    if(err){
      console.log("Error finding mongo results for announcements");
      res.writeHead(400, {
          'Content-Type': 'text/plain'
      })
      res.end("Error finding mongo results for announcements");
  }
   else {
     console.log(results)
     arr = results[0].announcements
     console.log("array",arr)

     var max_id = arr[arr.length-1].anct_id
     console.log("max_id",parseInt(max_id)+1)
     console.log(results[0].announcements)
    //  res.end(JSON.stringify(results[0].announcements))
  
    Courselist.findOneAndUpdate({
      courseid: req.body.courseid
    }, {
      $push: {
          announcements: {
            anct_id:parseInt(max_id)+1,
            courseid:req.body.courseid,
            anct_name: req.body.anct_name,
            anct_details: req.body.anct_details,
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
        res.end();
      }
    
    });
  }
})
  //   con.query("INSERT INTO announcements(courseid,anct_name,anct_details,anct_date) VALUES(?,?,?,?)",[req.body.courseid,req.body.anct_name,req.body.anct_details,req.body.anct_date], function (err, result, fields) {
  //     if (err) console.log(err)
  // });

  
  });
  module.exports=router