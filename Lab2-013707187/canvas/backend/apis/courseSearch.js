var router = require('express').Router();
var con = require('../db/sql')
  router.post('/coursesearch', function(req, res){
    courseres=[]
    courseresult=[]
    console.log(req.body)
    var courses = []
    const Courselist  = require('../models/Courses');

    Courselist.find({
      courseterm:req.body.cterm,
      coursename: { "$regex": req.body.cname, "$options": "i" },
  }, (err, results) => {
      if(err){
          console.log("Error finding mongo results for Job Applications");
          res.writeHead(400, {
              'Content-Type': 'text/plain'
          })
          res.end("Error finding mongo results for Job Applications");
      } else {
          console.log("Successfully retrieved Courses");
          res.writeHead(200, {
              'Content-type' : 'application/json',
          })
          
          if(req.body.cid!=""){
               var searchResultad = results.filter((course1)=>{
            
                switch(req.body.cidfilt){
                  case "exactly":
                      // console.log(req.body.cid)
                      if(course1.courseid===req.body.cid){

                        courseresult.push(course1)
                      }
                      break;
            
                  case "contains":
                  if(course1.courseid.indexOf(req.body.cid) > -1){
                    courseresult.push(course1)
                  }
                  break;
                  case "ge":
                  if(course1.courseid>=req.body.cid){
                    courseresult.push(course1)
                  }
                  break;
            
                  case "le":
                  if(course1.courseid<=req.body.cid){
                    courseresult.push(course1)
                  }
                  break;
                  default:
                  if(course1.courseid===req.body.cid){
                    courseresult.push(course1)
                  }
                  break;
                }
               });
              }
              else{
                courseresult = results
              }
console.log("after filter")
          console.log(courseresult)

          res.end(JSON.stringify(courseresult));
      }
  })
  });
  module.exports=router