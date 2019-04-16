var mongoose = require('mongoose');
//var configLink=require('./../config');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://admin:admin@cluster0-shard-00-00-9vb82.mongodb.net:27017,cluster0-shard-00-01-9vb82.mongodb.net:27017,cluster0-shard-00-02-9vb82.mongodb.net:27017/canvas?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",{useMongoClient: true,poolSize: 0});
var mdb=mongoose.connection;

mdb.on('error',console.error.bind(console,'Connection error'))
mdb.on('open',()=>{
    
    console.log('MongoDB connected!')
})

module.exports = {mongoose};