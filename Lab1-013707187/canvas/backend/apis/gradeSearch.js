
var router = require('express').Router();
var con = require('../db/sql')
router.post('/gradesearch',function(req,res){

    var courseid = req.body.id
    console.log(courseid)
    const StudentLogin  = require('../models/Studentdet');
    const Courselist  = require('../models/Courses');
    if(req.body.stufac=="student"){
 


   try {
     
    StudentLogin.find({studentid:req.body.loginid,"grades.courseid":req.body.id}, {_id:0, grades: 1}, (err, results) => {
      if(err){s
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
           
            Courselist.find({courseid:req.body.id}, {_id:0, quiz: 1}, (err, results) => {
         
                if(err){
                    console.log("courseid error")
                }
                else{
                    if(results.length>0){
                      console.log("results length",results)
                      arr1 = results[0].quiz
                      arr1.forEach(function(graderes){
                      if(graderes.quizid==grade.assignmentid){
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

      Courselist.find({courseid:req.body.id}, {_id:0, studentsregistered: 1}, (err, results) => {
         
        if(err){
            console.log("courseid error")
        }
        else{
        
            if(results.length>0){
              console.log("results length",results)
              arr2 = results[0].studentsregistered
              var counter = 0
              var courseresult = []
              arr2.forEach(function(studentres){
     
                  StudentLogin.find({studentid:studentres.studentid,"grades.courseid":req.body.id}, {_id:0, grades: 1}, (err, results) => {
                    if(err){
                      console.log("error -- mongo results for grades");
                      res.writeHead(400, {
                          'Content-Type': 'text/plain'
                      })
                      res.end("Error -- mongo results for grades");
                  }
                   else {
                     
                      console.log("Successfully retrieved grades");
                      
                      console.log("results",results)
                      if(results.length>0){
                     
                      arr = results[0].grades
                      var counter1 = 0
                      arr.forEach(function(grade){
                          console.log("course",grade)
                         
                          Courselist.find({courseid:req.body.id}, {_id:0, quiz: 1}, (err, results) => {
                       
                              if(err){
                                  console.log("courseid error")
                              }
                              else{
                                  if(results.length>0){
                                    console.log("results length",results)
                                    arr1 = results[0].quiz
                                    console.log("results quiz",arr1)
                                    arr1.forEach(function(graderes){
                                      console.log("quizid",graderes.quizid,"assignmentid",grade.assignmentid)
                                    if(graderes.quizid==grade.assignmentid){
                                    
                                  console.log("courseresult",courseresult)
                                   courseresult.push({studentid:studentres.studentid,courseid:grade.courseid,"name":graderes.name,"due":graderes.due,"score":grade.score,"marks":graderes.marks})
                                
                                    }
                                    
                                    
                                  })
                              }
                          }
                          console.log("counter1",counter1,arr.length-1)
                          console.log("..........")
                          console.log("counter",counter,arr2.length)
                          if(counter1==arr.length-1){
                            if(counter == arr2.length-1) {
                              console.log("coursesssssssssssssssssssssssssssss",courseresult)
                                res.end(JSON.stringify(courseresult));
                            }
                            counter++;
                            }
                        counter1++;
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
                  console.log("count",counter)
                  
              })
            console.log("hellllllllll")
            }
        }
      })

    //   con.query("(SELECT G.studentid,cd.coursename,P.name,P.due,G.score,P.marks FROM grades as G INNER JOIN assignmentlist as P ON G.courseid=P.courseid and G.assignmentid = P.assignmentid INNER JOIN coursedet as cd ON G.courseid = cd.courseid WHERE G.courseid ="+req.body.id+" AND cd.facultyid ="+req.body.loginid+") UNION (SELECT H.studentid,dc.coursename,Q.name,Q.due,H.score,Q.marks FROM grades as H INNER JOIN quiz as Q ON H.courseid=Q.courseid and H.assignmentid = Q.quizid  INNER JOIN coursedet as dc ON H.courseid = dc.courseid WHERE H.courseid ="+req.body.id+" AND dc.facultyid ="+req.body.loginid+")", function (err, result, fields) {
    //     if (err) console.log(err);
  
    // console.log(result)
    //     res.end(JSON.stringify(result))
  
  
    // });
    }
    })   
    
  module.exports=router
