
var bcrypt = require('bcrypt');
 var mysql = require('mysql');

 var con = mysql.createConnection({
   host: "127.0.0.1",
   user: "madhu",
   password: "madhu",
   database: "canvas"
 });
 con.connect(function(err) {
   if (err){
     console.log(err)
   } 
});
module.exports = con;