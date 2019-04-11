const Courselist  = require('../models/Courses');
function handle_request(msg, callback){
    console.log('Inside  Kafka Backend Login');


    console.log('Message', msg);
    
    // console.log(courseid)
    Courselist.find({courseid:msg.courseid,"announcements.anct_id":msg.anct_id}, {_id:0, announcements: 1}, (err, results) => {
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
