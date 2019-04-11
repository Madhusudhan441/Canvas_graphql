var mongoose = require('mongoose')
var mongoose = require('mongoose');
//var configLink=require('./../config');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://admin:admin@cluster0-shard-00-00-9vb82.mongodb.net:27017,cluster0-shard-00-01-9vb82.mongodb.net:27017,cluster0-shard-00-02-9vb82.mongodb.net:27017/canvas?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",{useMongoClient: true});
var mdb=mongoose.connection;

mdb.on('error',console.error.bind(console,'Connection error'))
mdb.on('open',()=>{
    
    console.log('MongoDB connected!')
})

const coursedetails = new mongoose.Schema({

    facultyid: {
        type: String,
        required: [true, 'Studentid is required']
      },
      courseid: {
        type: String,
        required: [true, 'Username is required']
      },
      coursename: {
        type: String,
        required: [true, 'password is required,']
      },
      coursedept: {
        type: String
        // required: [true, 'password is required,']
      },
      coursedes: {
        type: String
        // required: [true, 'password is required,']
      },
      courseroom: {
        type:Number
        // required: [true, 'password is required,']
      },
      coursecapacity: {
        type:Number
        // required: [true, 'password is required,']
      },
      courseterm: {
        type:String
        // required: [true, 'password is required,']
      },
      waitlistcapacity: {
        type:Number
        // required: [true, 'password is required,']
      },
      coursecol: {
        type:String
        // required: [true, 'password is required,']
      },
      announcements:[{
        anct_id: {
          type:String
          // required: [true, 'password is required,']
        },
        courseid:{
          type:String
        },
        anct_name: {
          type:String
          // required: [true, 'password is required,']
        },
        anct_details: {
          type:String
          // required: [true, 'password is required,']
        },
        anct_date: {
          type:Date
          // required: [true, 'password is required,']
        }
      }],
      studentsregistered:[{
        studentid:{
          type:String
        },
        studentname:{
          type:String
        }
      }
      ],
      
      assignments:[{
        assignmentid: {
          type:String
          // required: [true, 'password is required,']
        },
      
        name: {
          type:String
          // required: [true, 'password is required,']
        },
        due: {
          type:Date
          // required: [true, 'password is required,']
        },
        marks: {
          type:Number
          // required: [true, 'password is required,']
        }
      }],
      quiz:[{
        quizid: {
          type:String
          // required: [true, 'password is required,']
        },
        
        name: {
          type:String
          // required: [true, 'password is required,']
        },
        due: {
          type:Date
          // required: [true, 'password is required,']
        },
        marks: {
          type:Number
          // required: [true, 'password is required,']
        },
        quiztaken:{
            type:String
        },
        quizques:
           [ {
          
            quizquesid:{
                 type:String
               },
                  quizname: {
                    type:String
                    // required: [true, 'password is required,']
                  },
                  quizquestion: {
                    type:String
                    // required: [true, 'password is required,']
                  },
                  quizopt1: {
                    type:String
                    // required: [true, 'password is required,']
                  },
                  quizopt2: {
                    type:String
                    // required: [true, 'password is required,']
                  },
                  quizopt3: {
                    type:String
                    // required: [true, 'password is required,']
                  },
                  quizopt4: {
                    type:String
                    // required: [true, 'password is required,']
                  },
                  quizans:{
                      type:String
                  },
                  quizopted: {
                    type:String
                    // required: [true, 'password is required,']
                  },
            }]
        
      }]

},{strict:"false"})
var CourseDetails = mongoose.model('courses',coursedetails);
module.exports = CourseDetails;
