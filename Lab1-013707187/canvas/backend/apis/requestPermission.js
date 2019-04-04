var router = require('express').Router();
var con = require('../db/sql')
router.post('/requestpermission',function(req,res){
    console.log("hello",req.body)
      con.query("UPDATE  studentcourses SET coursestatus ='enrolled' WHERE studentid = "+JSON.stringify(req.body.loginid)+" and courseid="+JSON.stringify(req.body.courseid), function (err, result, fields) {
        if (err) console.log(err);
        console.log(result.affectedRows + " record(s) updated");
    });
    res.end();
    });
  module.exports=router
    