var router = require('express').Router();
var con = require('../db/sql')
var mysql = require('mysql');

  router.post('/updategrades', function(req, res){
    const StudentLogin  = require('../models/Studentdet');
    req.body.grade_details.forEach(studgrad => {
        
   
    StudentLogin.findOneAndUpdate({
        studentid: studgrad.studentid
      }, {
        $push: {
            grades: {
                       
                        "courseid": req.body.courseid,
                        "assignmentid":studgrad.assignmentid,
                        "score":studgrad.score
            }
        },
      },
      {
        upsert: true
      }
      , function (err,result) {
        if (err){
          
          res.status(500).end();
        console.log(err)
        }
            
        else{
            console.log(result)
        }  
    })

});
  })
module.exports=router
