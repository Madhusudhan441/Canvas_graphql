const Courselist  = require('../models/Courses');
function handle_request(msg, callback){
    console.log('Inside  Kafka Backend Login');


    console.log('Message', msg);
    
    // console.log(courseid)
    Courselist.find({courseid:msg.courseid}, {_id:0, studentsregistered: 1}, (err, results) => {

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
exports.handle_request = handle_request;
