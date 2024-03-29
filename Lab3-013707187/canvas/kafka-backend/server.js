var connection =  new require('./kafka/Connection');
var mongoose = require('mongoose');
//var configLink=require('./../config');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://admin:admin@cluster0-shard-00-00-9vb82.mongodb.net:27017,cluster0-shard-00-01-9vb82.mongodb.net:27017,cluster0-shard-00-02-9vb82.mongodb.net:27017/canvas?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",{useMongoClient: true});
var mdb=mongoose.connection;

mdb.on('error',console.error.bind(console,'Connection error'))
mdb.on('open',()=>{
    
    console.log('MongoDB connected!')
})


//var signin = require('./services/signin.js');
var Books = require('./services/books.js');
var Login = require('./services/login');
var getAnnounce = require('./services/getannounce')
var getannouncedet = require('./services/getannouncedet')
var getassignment = require('./services/getassignment')
var getassignmentdet = require('./services/getassignmentdet')
var getprofile = require('./services/getprofile')
var getpeople = require('./services/getpeople')
var getstudents = require('./services/getstudents')
var getcourses = require('./services/getcourses')
var getprofessors = require('./services/getprofessors')









function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("post_book",Books)
handleTopicRequest("login", Login);
handleTopicRequest("getannounce", getAnnounce);
handleTopicRequest("getannouncedet", getannouncedet);
handleTopicRequest("getassignment", getassignment);
handleTopicRequest("getassignmentdet", getassignmentdet);
handleTopicRequest("getprofile", getprofile);
handleTopicRequest("getpeople", getpeople);
handleTopicRequest("getstudents", getstudents);
handleTopicRequest("getprofessors", getprofessors);
handleTopicRequest("getcourses", getcourses);










