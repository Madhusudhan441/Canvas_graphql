var router = require('express').Router();
router.post('/sendmessage', function(req, res){
    const StudentLogin  = require('../models/Studentdet');
    const Facultydetails  = require('../models/Facultydetails');

console.log("id",req.body)
if(req.body.stufac=='student' && req.body.tostufac=="student"){
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
      })}
      else if(req.body.stufac=='faculty' && req.body.tostufac=="student"){
        console.log("toid",req.body.fromId)
        Facultydetails.update({
            facultyid: req.body.fromId
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
          })}
      else if(req.body.stufac=='student' && req.body.tostufac=="faculty"){
        
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
                Facultydetails.update({
                    facultyid: req.body.toId
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
          })}
      
      else{
        
        Facultydetails.update({
          facultyid: req.body.fromId
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
              Facultydetails.update({
                  facultyid: req.body.toId
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
      }
    

})

module.exports=router
