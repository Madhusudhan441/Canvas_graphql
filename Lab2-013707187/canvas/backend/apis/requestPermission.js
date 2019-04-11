var router = require('express').Router();
var con = require('../db/sql')
router.post('/requestpermission',function(req,res){
    console.log("hello",req.body)
    const StudentLogin  = require('../models/Studentdet');

      
    StudentLogin.updateOne({
         studentid: req.body.loginid,
         "studentcourses.courseid":req.body.courseid
       },  {$set:{
        
           "studentcourses.$.coursestatus":"enrolled"
       
       }
         },{upsert:true}
        , function (err, result) {
         if (err){
         console.log(err)
             return res.send(500, {
                 error: err
             });
            }
          else{
            console.log("permission number generated")
            res.end();
          }
            })
            

    //   con.query("UPDATE  studentcourses SET coursestatus ='enrolled' WHERE studentid = "+JSON.stringify(req.body.loginid)+" and courseid="+JSON.stringify(req.body.courseid), function (err, result, fields) {
    //     if (err) console.log(err);
    //     console.log(result.affectedRows + " record(s) updated");
    // });

    });
  module.exports=router
    