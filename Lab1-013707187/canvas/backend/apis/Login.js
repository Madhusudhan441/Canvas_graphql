var router = require('express').Router();
var con = require('../db/sql')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config//settings');
const secret = "secret";
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var kafka = require('../kafka/client');
router.post('/login',function(req,res){
    console.log("Inside Login Post Request");
    
    kafka.make_request('login', req.body, function(err, result){
        console.log('In results login');
        console.log('results', result);
        if(err){
            console.log('Inside err login');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in login!');
        }
        else if(result==null){
            console.log("null received")
            res.code = "406";
            res.value = "Invalid password";
            console.log(res.value);
            res.sendStatus(406).end();
        }
        else if(result==false){
            console.log("in false")
            console.log("err",err)
            res.code = "400";
            res.value = "The Student id entered is invalid. Please try again.";
            console.log(res.value);
            res.sendStatus(400).end();
        }
        else{
            console.log('Inside results Login');
            if(result){
                var token = jwt.sign(req.body,secret,{
                            expiresIn : 10080
                        })
            
              
                res.status(200).json({ success: true, token:token, username : result.username, cookie:"user"});

                    }

                }
    })
    
  }); 
  
  module.exports=router