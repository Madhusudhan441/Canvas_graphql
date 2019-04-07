var router = require('express').Router();
router.post('/sendmessage', function(req, res){
    const StudentLogin  = require('../models/Studentdet');
console.log("id",req.body)

    StudentLogin.update({
        studentid: req.body.fromId
      }, {
        
        $push: {
          messages: {
                       
            studentid: req.body.toId,
            messagecontent:{
                studentname:req.body.fromName,
                message:req.body.message
            }
            
                       
            }
        }
      }, {
        upsert: true
      }, function (err, result) {
        if (err){       
            console.log(err)
            return res.send(500, {
                error: err
            });
        }
        else{
            StudentLogin.update({
                studentid: req.body.toId
              }, {
                
                $push: {
                  messages: {
                               
                    studentid: req.body.fromId,
                    messagecontent:{
                        studentname:req.body.fromName,
                        message:req.body.message
                    }
                    
                               
                    }
                }
              }, {
                upsert: true
              }, function (err, result) {
                if (err){       
                    console.log(err)
                    return res.send(500, {
                        error: err
                    });
                }
                else{
        
                  console.log("message sent successfully")
                  res.sendStatus(200).end("message sent successfully")
                }
              })

         
        }
      })
    

})

module.exports=router
