
var router = require('express').Router();
var con = require('../db/sql')
router.post('/getprofile',function(req,res){
  
    if(req.body.stufac==="faculty"){
      con.query("SELECT *  FROM facultydetails WHERE facultyid = "+JSON.stringify(req.body.loginid), function (err, result, fields) {
        if (err) {
        console.log(err)
        }
       res.end(JSON.stringify(result))
      })
    }
    else{
      con.query("SELECT *  FROM studentdet WHERE studentid ="+JSON.stringify(req.body.loginid), function (err, result, fields) {
        if (err){console.log(err)};
        res.end(JSON.stringify(result))
      })
    }
        
  })
  module.exports=router


