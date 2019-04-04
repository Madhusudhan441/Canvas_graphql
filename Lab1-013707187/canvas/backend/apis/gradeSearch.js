
var router = require('express').Router();
var con = require('../db/sql')
router.post('/gradesearch',function(req,res){

    var courseid = req.body.id
    console.log(courseid)
    if(req.body.stufac=="student"){
   try {
      con.query("(SELECT G.studentid,cd.coursename,P.name,P.due,G.score,P.marks FROM grades as G INNER JOIN assignmentlist as P ON G.courseid=P.courseid and G.assignmentid = P.assignmentid INNER JOIN coursedet as cd ON G.courseid = cd.courseid WHERE G.courseid ="+courseid+" AND G.studentid = "+req.body.loginid+") UNION (SELECT H.studentid,dc.coursename,Q.name,Q.due,H.score,Q.marks FROM grades as H INNER JOIN quiz as Q ON H.courseid=Q.courseid and H.assignmentid = Q.quizid INNER JOIN coursedet as dc ON H.courseid = dc.courseid WHERE H.courseid ="+courseid+" AND H.studentid = "+req.body.loginid+")", function (err, result, fields) {
        if (err) console.log(err);
  
    console.log(result)
        res.end(JSON.stringify(result))
  
  
    });
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
