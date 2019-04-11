var router = require('express').Router();
var kafka = require('../kafka/client');

router.post('/getprofessors',function(req,res){
    const Facultydetails  = require('../models/Facultydetails');

    kafka.make_request('getprofessors', req.body, function(err, results){
        if(results){
          if(results.length>0){
            console.log("Professor results",results)
            res.end(JSON.stringify(results))
             }
          else{
            console.log("Error finding mongo results for Professor Details");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error finding mongo results for Professor Details");
          }
        }
        else{
         res.writeHead(400, {
           'Content-Type': 'text/plain'
       })
       res.end("Error finding mongo results for Professor Details");
        }
      })
    })

module.exports=router

