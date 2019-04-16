var router = require('express').Router();
var con = require('../db/sql')
const Courselist  = require('../models/Courses');

router.post('/generatepermissioncodes',function(req,res){
    permissions=[]
    quesarr = [1,2,3,4,5,6,7,8,9]
    quesarr.forEach((quiz,i) => {
        // permissions.push(
        //   {
        //     permissionnumber:Math.floor((Math.random() * 19999) + 10000),
        //     status:"true"
                        
        //               }
        // )
        //             })
    console.log(permissions)
    Courselist.findOneAndUpdate({
        courseid: req.body.courseid,
      }, {
        $push: {
            permissionnumbers:{
              permissionnumber:Math.floor((Math.random() * 19999) + 10000),
             status:"true"
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
          if(i==9){
            console.log("permission numbers generated")
          res.writeHead(200,{
            'Content-Type' : 'text/plain'
          })
          res.end();
        }}
    })
  })
})
module.exports=router
