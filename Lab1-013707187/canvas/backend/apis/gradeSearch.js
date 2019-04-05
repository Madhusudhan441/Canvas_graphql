
var router = require('express').Router();
var con = require('../db/sql')
router.post('/gradesearch',function(req,res){

    var courseid = req.body.id
    console.log(courseid)

    if(req.body.stufac=="student"){
 const StudentLogin  = require('../models/Studentdet');
 const Courselist  = require('../models/Courses');


   try {
    StudentLogin.find({studentid:req.body.loginid,"grades.courseid":req.body.id}, {_id:0, grades: 1}, (err, results) => {
      if(err){
        console.log("error -- mongo results for grades");
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })
        res.end("Error -- mongo results for grades");
    }
     else {
        var courseresult = []
        console.log("Successfully retrieved grades");
        res.writeHead(200, {
            'Content-type' : 'application/json',
        })
        console.log("results",results)
        if(results.length>0){
        var counter = 0
        arr = results[0].grades
        arr.forEach(function(grade){
            console.log("course",grade)
           
            Courselist.find({courseid:req.body.id,"assignments":{$elemMatch:{assignmentid:grade.assignmentid}}}, {_id:0, assignments: 1}, (err, results) => {
         
                if(err){
                    console.log("courseid error")
                }
                else{
                    if(results!=null){
                      arr1 = results[0].assignments
                      arr1.forEach(function(graderes){
                      if(graderes.assignmentid==grade.assignmentid){
                    console.log("courseresult",graderes)
                     courseresult.push({studentid:req.body.loginid,courseid:grade.courseid,"name":graderes.name,"due":graderes.due,"score":grade.score,"marks":graderes.marks})
                  
                      }
                    })
                }
            }
                if(counter == arr.length - 1) {
                  console.log(courseresult)
                    res.end(JSON.stringify(courseresult));
                }
                counter++;
            })
          
    
        })
      }
      else{
        console.log("no grades found")
      }
     
    }
    })
    

    //   con.query("(SELECT G.studentid,cd.coursename,P.name,P.due,G.score,P.marks FROM grades as G INNER JOIN assignmentlist as P ON G.courseid=P.courseid and G.assignmentid = P.assignmentid INNER JOIN coursedet as cd ON G.courseid = cd.courseid WHERE G.courseid ="+courseid+" AND G.studentid = "+req.body.loginid+") UNION (SELECT H.studentid,dc.coursename,Q.name,Q.due,H.score,Q.marks FROM grades as H INNER JOIN quiz as Q ON H.courseid=Q.courseid and H.assignmentid = Q.quizid INNER JOIN coursedet as dc ON H.courseid = dc.courseid WHERE H.courseid ="+courseid+" AND H.studentid = "+req.body.loginid+")", function (err, result, fields) {
    //     if (err) console.log(err);
  
    // console.log(result)
    //     res.end(JSON.stringify(result))
  
  
    // });
  } catch (error) {
     console.log("connection error")
  }
    }
    else{
      con.query("(SELECT G.studentid,cd.coursename,P.name,P.due,G.score,P.marks FROM grades as G INNER JOIN assignmentlist as P ON G.courseid=P.courseid and G.assignmentid = P.assignmentid INNER JOIN coursedet as cd ON G.courseid = cd.courseid WHERE G.courseid ="+req.body.id+" AND cd.facultyid ="+req.body.loginid+") UNION (SELECT H.studentid,dc.coursename,Q.name,Q.due,H.score,Q.marks FROM grades as H INNER JOIN quiz as Q ON H.courseid=Q.courseid and H.assignmentid = Q.quizid  INNER JOIN coursedet as dc ON H.courseid = dc.courseid WHERE H.courseid ="+req.body.id+" AND dc.facultyid ="+req.body.loginid+")", function (err, result, fields) {
        if (err) console.log(err);
  
    console.log(result)
        res.end(JSON.stringify(result))
  
  
    });
    }
    })   
    
  module.exports=router
