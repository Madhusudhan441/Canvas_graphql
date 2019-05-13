var router = require('express').Router();
var con = require('../db/sql')
router.post('/addcourse',function(req,res){

    

 const AddCourse  = require('../models/Courses');

 var courseSchema = new AddCourse({
 
    facultyid:req.body.facultyid,
      courseid:req.body.courseid,
      coursename: req.body.coursename,
      coursedept: req.body.coursedept,
      coursedes: req.body.coursedes,
      courseroom: req.body.courseroom,
      coursecapacity:req.body.coursecap,
      courseterm: req.body.courseterm,
      waitlistcapacity: req.body.coursewaitcap,
      coursecol: req.body.coursecol,
      announcements:[],
      assignments:[],
      quiz:[]
 });
//  courseSchema.save().then(result =>{
//     console.log(result);
//   })
//   .catch(err =>console.log(err));

AddCourse.findOne({
   courseid: req.body.courseid
}, function (err, course) {
   if (course) {
       console.log("courseid already exists")
   }
   else{
       console.log("in error")
       courseSchema.save().then(result =>{
           console.log(result);
         })
         .catch(err =>console.log(err));
   }
})

//     console.log(req.body)
//     con.query("INSERT INTO `coursedet` (`facultyid`, `courseid`, `coursename`, `coursedept`, `coursedes`, `courseroom`, `coursecapacity`, `waitlistcapacity`, `courseterm`, `coursecol`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[req.body.facultyid,req.body.courseid,req.body.coursename, req.body.coursedept, req.body.coursedes, req.body.courseroom,req.body.coursecap, req.body.coursewaitcap, req.body.courseterm, req.body.coursecol], function (err, result, fields) {
//       if (err) console.log(err)
//   });
//   res.writeHead(200,{
//     'Content-Type' : 'text/plain'
//   })
//   res.end();
  
  });

  module.exports=router
