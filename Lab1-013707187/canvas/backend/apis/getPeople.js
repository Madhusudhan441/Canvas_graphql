var router = require('express').Router();
var con = require('../db/sql')
router.post('/getpeople',function(req,res){
    console.log(req.body)
        con.query("SELECT * FROM studentcourses WHERE courseid ="+req.body.courseid, function (err, result, fields) {
          if (err) console.log(err);
          console.log(result)
         
          res.end(JSON.stringify(result))
    
      });
      })

      module.exports=router