var router = require('express').Router();
var con = require('../db/sql')
var mysql = require('mysql');

  router.post('/regcourse', function(req, res){
    const StudentLogin  = require('../models/Studentdet');
    const Courselist  = require('../models/Courses');
    console.log("hello",req.body.stuname,req.body.courseid)
  if(req.body.enrollstatus=="Drop"){
    const StudentLogin  = require('../models/Studentdet');
    
    console.log("hello",req.body.stuname,req.body.courseid)
    let x = req.body.id
    











    StudentLogin.findOneAndUpdate({
      studentid: x
    }, {
      $pull: {
          studentcourses: {
                     
                      "courseid": req.body.courseid,
          }
      },
    },
    {
      upsert: true
    }
    , function (err,   result) {
      if (err){
        
        res.status(500).end();
        throw(err)
      }
          
      else{
      
            Courselist.findOneAndUpdate({
             
              courseid:req.body.courseid
            },{
              $inc: { coursecapacity: + 1}
              // "coursecapacity":course.coursecapacity+1
            },function(err,res){
              if(res){
                console.log("course capacity updated")
              }
              else{
                console.log("could not update course capacity")
              }
            });
          
console.log("course dropped")
      }
    });
//   con.query("SELECT * from studentcourses WHERE username="+JSON.stringify(req.body.stuname)+"AND courseid="+JSON.stringify(req.body.courseid), function (err, result, fields) {
//     if (err) console.log(err);

//   console.log(",,,,,,,",result)
//     con.query("DELETE FROM studentcourses WHERE username="+JSON.stringify(req.body.stuname)+"AND courseid="+JSON.stringify(req.body.courseid), function (err, result, fields) {
//       if (err) console.log(err);

//   });
  
//  if(result[0].coursestatus=="enrolled"){

//   con.query("UPDATE  studentcourses SET coursestatus ='enrolled' WHERE coursestatus='waitlist' and courseid="+JSON.stringify(req.body.courseid)+" LIMIT 1"  , function (err, result, fields) {
//     if (err) console.log(err);
//     console.log(result.affectedRows + " record(s) updated");
// });
// con.query("SELECT * FROM coursedet WHERE courseid="+mysql.escape(req.body.courseid), function (err, result, fields) {
//   if (err) console.log(err);
//   con.query("UPDATE coursedet SET coursecapacity = ? WHERE courseid = ?",[result[0].coursecapacity+1,req.body.courseid], function (err, result, fields) {
//     if (err) console.log(err);
// });
    
// });
//  }
// });
  res.end()
  }
  else{
    
    Courselist.findOneAndUpdate({
      courseid: req.body.courseid
    }, {
      $push: {
        studentsregistered: {
                     
          studentid: req.body.id,
          studentname: req.body.stuname,
                     
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
        console.log("studnets updated")
      }
    })

   console.log(req.body.coursecol)
   
    Courselist.findOne({
      courseid: req.body.courseid
  }, function (err, course) {
       if (course) {
         if(course.coursecapacity>0){
   console.log("courseregistering")
    StudentLogin.findOneAndUpdate({
      studentid: req.body.id
    }, {
      $push: {
          studentcourses: {
                     
                      courseid: req.body.courseid,
                      coursename: req.body.coursename,
                      coursecol:req.body.coursecol,
                      coursestatus:"enrolled"
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
        console.log("course registered")
        Courselist.findOneAndUpdate({
       
          courseid:req.body.courseid
        },{
          "coursecapacity":course.coursecapacity-1
        },function(err,res){
          if(res){
            console.log("course capacity updated")
          }
          else{
            console.log("could not update course capacity")
          }
        });

      }
    
    });
  }
  else if (course.waitlistcapacity>0){
    let x = req.body.id
    console.log("course waitlist updated")
    StudentLogin.findOneAndUpdate({
      studentid: x
    }, {
      $push: {
          studentcourses: {
                      "courseid": req.body.courseid,
                      "coursename": req.body.coursename,
                      "coursecol":req.body.coursecol,
                      "coursestatus":"waitlist"
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
        console.log("course added to waitlist")
        Courselist.findOneAndUpdate({
      
          courseid:req.body.courseid
        },{
          "waitlistcapacity":course.waitlistcapacity-1
        },function(err,res){
          if(res){
            console.log("course waitlistcapacity updated")
          }
          else{
            console.log("could not update waitlist capacity")
          }
        });
          res.status(200).end();
      }
    
    });
  }
  else{
    console.log("class is already full")
  }
       }
       else{
        console.log("no course exists");
       }
  });
   

//     con.query("SELECT * FROM coursedet WHERE courseid="+mysql.escape(req.body.courseid), function (err, result, fields) {
//       if (err) console.log(err);
//     console.log(result)
// console.log("hi",result[0].coursecapacity-1)
//      if(result[0].coursecapacity>0){
//        console.log("........................",result[0].coursecapacity-1,req.body.courseid,JSON.stringify(req.body.courseid))
      
//     con.query("INSERT INTO studentcourses(studentid,username,courseid,coursestatus) VALUES(?,?,?,?)",['402',req.body.stuname,req.body.courseid,'enrolled'], function (err, result, fields) {
//       if (err) console.log(err)
//   });
//   con.query("UPDATE coursedet SET coursecapacity = ? WHERE courseid = ?",[result[0].coursecapacity-1,req.body.courseid], function (err, result, fields) {
//     if (err) console.log(err);
// });
    
//      }
//      else if(result[0].waitlistcapacity>0){
//       con.query("INSERT INTO studentcourses(studentid,username,courseid,coursestatus) VALUES(?,?,?,?)",['402',req.body.stuname,req.body.courseid,'waitlist'], function (err, result, fields) {
//         if (err)console.log(err)
//     });
//     con.query("UPDATE coursedet SET waitlistcapacity = ? WHERE courseid = ?",[result[0].waitlistcapacity-1,req.body.courseid], function (err, result, fields) {
//       if (err) console.log(err);
//   });
//      }
//      else{
//        console.log("Class is full")
//      }
//   });
    
  }
  res.end()
  });
  module.exports=router
