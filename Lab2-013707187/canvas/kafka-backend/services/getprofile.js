// const Courselist  = require('../models/Courses');
const StudentLogin  = require('../models/Studentdet');
const Facultydetails = require('../models/Facultydetails')
function handle_request(msg, callback){
    console.log('Inside  Kafka Backend Login');


    console.log('Message', msg);
    if(msg.stufac==="faculty"){
        
          Facultydetails.find({facultyid:msg.loginid}, (err, results) => {
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

 StudentLogin.find({studentid:msg.loginid}, (err, results) => {
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
