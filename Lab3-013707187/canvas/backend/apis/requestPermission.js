var router = require('express').Router();
var con = require('../db/sql')
router.post('/requestpermission',function(req,res){
    console.log("hello",req.body)
    const StudentLogin  = require('../models/Studentdet');
    const Courselist  = require('../models/Courses');
    var successflag = false
    Courselist.find({courseid:req.body.courseid}, {_id:0, permissionnumbers: 1}, (err, results) => {
      if (results) {
      
    
        console.log("permission", results[0].permissionnumbers)
        arr = results[0].permissionnumbers
        arr.push({permissionnumber:-12,status:"true"})
        arr.push({permissionnumber:-12,status:"true"})

        console.log("length array",arr.length)
          arr.forEach((code,i) => {
            console.log("code",code,req.body.code)
            if(code.permissionnumber==req.body.code && code.status == "true"){
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
                
                    // return res.send(500, {
                    //     error: err
                    // });
                    
                   }
                 else{
              console.log("course added")
              console.log("permission number generated",i)
               successflag = true
                }
                   })
                   Courselist.updateOne({
                    courseid: req.body.courseid,
                    "permissionnumbers.permissionnumber":req.body.code,
                  },  {$set:{
                   
                      "permissionnumbers.$.status":"false"
                  
                  }
                    },{upsert:true}
                   , function (err, result) {
                    if (err){
                    console.log(err)
                    
                        // return res.send(500, {
                        //     error: err
                        // });
                        
                       }
                     else{
                  console.log("permission number status updated")
                  // console.log("permission number generated",i)
                   successflag = true
                    }
                       })
          
              console.log("in user",results)
            
    
          }
  
      else{
        console.log("in else",i)
// res.send(400).end();

      }
      if(i>=10){

        console.log(" in 9",successflag)
        if(successflag == true){
          res.sendStatus(200).end();
          console.log("permission number  generated")
      
        }
        else{
          console.log("permission number not generated")
        res.sendStatus(400).end();
        }
      }
  })

}
else{
  res.send(400).end();
  console.log(err)
}
});


  
    //   con.query("UPDATE  studentcourses SET coursestatus ='enrolled' WHERE studentid = "+JSON.stringify(req.body.loginid)+" and courseid="+JSON.stringify(req.body.courseid), function (err, result, fields) {
    //     if (err) console.log(err);
    //     console.log(result.affectedRows + " record(s) updated");
    // });

    });
  module.exports=router
    