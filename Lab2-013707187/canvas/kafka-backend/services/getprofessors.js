// const Courselist  = require('../models/Courses');
const FacultyLogin  = require('../models/Facultydetails');

function handle_request(msg, callback){
    console.log('Inside  Kafka Backend Login');


    console.log('Message', msg);
    
    // console.log(courseid)
    FacultyLogin.find({}, function (err, results) {


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
