

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://admin:admin@cluster0-shard-00-00-9vb82.mongodb.net:27017,cluster0-shard-00-01-9vb82.mongodb.net:27017,cluster0-shard-00-02-9vb82.mongodb.net:27017/<DBNAME>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

// MongoClient.connect(url, function (err, db) {
// 	if (err) throw err;
// 	console.log("Connected!")
// 	var dbo = db.db("canvas");
// 	dbo.collection('studentdet').insertOne({
// 					 studentid:440,
// 					 name:"sai",
// 					 username:"sai",
// 					 city:"hyderabad",
// 					 email:"sai@gmail.com",
// 					 courses:{
// 						 courseid:255,
// 						 coursestatus:"enrolled"
// 					 }
// 				 },(err,result)=>{
// 					 if(err){
// 						 console.log("unable to insert entry into database")
// 					 }throw(err)	
// 				 })
// });


// module.exports = {MongoClient};