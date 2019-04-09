var router = require('express').Router();
var con = require('../db/sql')
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false});

router.post('/getannounce',requireAuth,function(req,res){
  const Courselist  = require('../models/Courses');

    var courseid = req.body.courseid
    console.log(courseid)
    Courselist.find({courseid:req.body.courseid}, {_id:0, announcements: 1}, (err, results) => {
      if(err){
        console.log("Error finding mongo results for announcements");
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })
        res.end("Error finding mongo results for announcements");
    }
     else {
       console.log("announcement results",results[0].announcements)
       res.end(JSON.stringify(results[0].announcements))
     }
    })
});
  //     con.query("SELECT * FROM announcements WHERE courseid ="+courseid, function (err, result, fields) {
  //       if (err) console.log(err);
  //       res.end(JSON.stringify(result))
  //   });
  // })
  router.post('/getannouncedet',requireAuth,function(req,res){
  const Courselist  = require('../models/Courses');
  
    Courselist.find({courseid:req.body.courseid,"announcements.anct_id":req.body.anct_id}, {_id:0, announcements: 1}, (err, results) => {
      if(err){
        console.log("Error finding mongo results for announcements");
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })
        res.end("Error finding mongo results for announcements");
    }
     else {
       
       arr = results[0].announcements
       console.log("inarray",arr)
       arr.forEach(function(announce){
        console.log(announce)
        if(announce.anct_id==req.body.anct_id){
          res.end(JSON.stringify([announce]))
        }
       })
      
     }
    })
  //   con.query("SELECT * FROM announcements WHERE courseid ="+req.body.courseid+" AND anct_id="+req.body.anct_id, function (err, result, fields) {
  //     if (err) console.log(err);
  //     res.end(JSON.stringify(result))
  // });
})
  module.exports=router
