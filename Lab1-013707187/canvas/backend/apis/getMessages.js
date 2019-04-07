var router = require('express').Router();

router.post('/getmessages',function(req,res){
    const StudentLogin  = require('../models/Studentdet');

    StudentLogin.find({studentid:req.body.fromId}, {_id:0, messages: 1}, (err, results) => {
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
          console.log("results",results.length)
if(results.length>0){
    var messageresult = []
    console.log("messages",results[0].messages)
    var counter = 0
    results[0].messages.forEach(messageres => {
      
        if(messageres.studentid==req.body.toId){
            messageresult.push([{"studentname":messageres.messagecontent[0].studentname},{"message":messageres.messagecontent[0].message}])
        }
        console.log("count",counter,results[0].messages.length-1)
if(counter==results[0].messages.length-1){
    console.log("message result",messageresult)
    res.end(JSON.stringify(messageresult))
}

counter++;
    });
}
        }
    })


})

module.exports=router
