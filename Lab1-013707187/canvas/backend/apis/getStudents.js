var router = require('express').Router();
var kafka = require('../kafka/client');

router.post('/getstudents',function(req,res){
    const StudentLogin  = require('../models/Studentdet');

    kafka.make_request('getstudents', req.body, function(err, results){
        if(results){
          if(results.length>0){
            console.log("Student results",results)
            res.end(JSON.stringify(results))
             }
          else{
            console.log("Error finding mongo results for People Details");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error finding mongo results for People Details");
          }
        }
        else{
         res.writeHead(400, {
           'Content-Type': 'text/plain'
       })
       res.end("Error finding mongo results for People Details");
        }
      })


//     StudentLogin.find({}, function (err, results) {
//         if(err){
//             console.log("Error finding mongo results for Students");
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Error finding mongo results for Students");
//         }
//          else {
//              if(results.length>0){
//                 console.log("Student results",results)
//                 res.end(JSON.stringify(results))
//              }
//              else{
//                  console.log("no details found for students")
//              }
      
//          }
// })

})

module.exports=router
