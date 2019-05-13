var router = require('express').Router();
var con = require('../db/sql')
var kafka = require('../kafka/client');
const Courselist  = require('../models/Courses');

router.post('/getcourselist',function(req,res){
    kafka.make_request('getcourses', req.body, function(err, results){
        if(results){
            if(results.length>0){
                if(req.body.stufac==="faculty"){
                    console.log("Successfully retrieved Courses");
                    res.writeHead(200, {
                        'Content-type' : 'application/json',
                    })
                    console.log(results)
          
                    res.end(JSON.stringify(results));
                }
                else{
                   var courseresult = []
                    var counter = 0
                    arr = results[0].studentcourses
                    arr.forEach(function(course){
                        console.log("course",course)
                        Courselist .findOne({courseid:course.courseid}, (err, results) => {
                            
                            if(err){
                                console.log("courseid error")
                            }
                            else{
                                if(results!=null){
                                console.log("courseresult",results)
                                 courseresult.push({"courseid":course.courseid,"coursestatus":course.coursestatus,"coursename":results.coursename,"coursecol":results.coursecol})
                                console.log("incourse",courseresult)
                            
                            }
                        }
                            if(counter == arr.length - 1) {
                                res.end(JSON.stringify(courseresult));
                            }
                            counter++;
                        })
                
                
                    })
                }
     
               }
            else{
              console.log("Error finding mongo results for course Details");
              res.writeHead(400, {
                  'Content-Type': 'text/plain'
              })
              res.end("Error finding mongo results for course Details");
            }
          }
          else if(results==[]){
            res.writeHead(200, {
                'Content-type' : 'application/json',
            })
            console.log(results)
          }
          else{
           res.writeHead(400, {
             'Content-Type': 'text/plain'
         })
         res.end("Error finding mongo results for course");
          }

    })
//     var stuname = req.body.stuname  
//     console.log("body",req.body)
//  const Courselist  = require('../models/Courses');
 
//   if(req.body.stufac==="faculty"){
//     console.log("in get courses",req.body.id);
//     var facultyid = req.body.id
//     Courselist.find({
//       facultyid
//   }, (err, results) => {
//       if(err){
//           console.log("Error finding mongo results for Job courses");
//           res.writeHead(400, {
//               'Content-Type': 'text/plain'
//           })
//           res.end("Error finding mongo results for courses");
//       } else {
//           console.log("Successfully retrieved Courses");
//           res.writeHead(200, {
//               'Content-type' : 'application/json',
//           })
//           console.log(results)

//           res.end(JSON.stringify(results));
//       }
//   })
//   //   con.query("SELECT * FROM  coursedet JOIN facultydetails on coursedet.facultyid=facultydetails.facultyid WHERE facultydetails.username="+JSON.stringify(req.body.stuname), function (err, result, fields) {
//   //     if (err) console.log(err);
//   //     res.end(JSON.stringify(result))
//   // });
//   }
//   else{
//  const StudentLogin  = require('../models/Studentdet');
//  console.log("inside results",req.body.id)
//  StudentLogin.find({studentid:req.body.id}, {_id:0, studentcourses: 1}, (err, results) => {
//   if(err){
//     console.log("Error finding mongo results for Job Applications");
//     res.writeHead(400, {
//         'Content-Type': 'text/plain'
//     })
//     res.end("Error finding mongo results for Job Applications");
// }
//  else {
//     var courseresult = []
//     console.log("Successfully retrieved Courses");
//     res.writeHead(200, {
//         'Content-type' : 'application/json',
//     })
//     if(results.length>0){
//     console.log("results",results[0].studentcourses)
//     var counter = 0
//     arr = results[0].studentcourses
//     arr.forEach(function(course){
//         console.log("course",course)
//         Courselist .findOne({courseid:course.courseid}, (err, results) => {
            
//             if(err){
//                 console.log("courseid error")
//             }
//             else{
//                 if(results!=null){
//                 console.log("courseresult",results)
//                  courseresult.push({"courseid":course.courseid,"coursestatus":course.coursestatus,"coursename":results.coursename,"coursecol":results.coursecol})
//                 console.log("incourse",courseresult)
            
//             }
//         }
//             if(counter == arr.length - 1) {
//                 res.end(JSON.stringify(courseresult));
//             }
//             counter++;
//         })


//     })
// }
 
// }
// })
//   //   con.query("SELECT * FROM  studentcourses JOIN coursedet ON coursedet.courseid = studentcourses.courseid JOIN studentdet ON studentdet.username=studentcourses.username WHERE studentdet.username="+JSON.stringify(req.body.stuname), function (err, result, fields) {
//   //     if (err) console.log(err);
//   //     res.end(JSON.stringify(result))
//   // });
// }
    
  })
  
  module.exports=router
