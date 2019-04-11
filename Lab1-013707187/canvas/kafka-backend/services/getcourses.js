// const Courselist  = require('../models/Courses');
const StudentLogin  = require('../models/Studentdet');
const Courselist = require('../models/Courses')
function handle_request(msg, callback){
    console.log('Inside  Kafka Backend Login');


    console.log('Message', msg);
    if(msg.stufac==="faculty"){
            // console.log("in get courses",req.body.id);
            var facultyid = msg.id
            Courselist.find({
              facultyid
          }, (err, results) => {
          
            if (results) {
    
                console.log("in user",results)
                callback(null,results)
            }
    
        else{
            console.log("null")
            callback(null,null);
        }
          })
        }
        else{

            StudentLogin.find({studentid:msg.id}, {_id:0, studentcourses: 1}, (err, results) => {
    if (results) {
    
        console.log("in user",results)
        callback(null,results)
    }

else{
    console.log("null")
    callback(null,null);
}

      })
        }
        
    // console.log(courseid)
   

}
exports.handle_request = handle_request;
