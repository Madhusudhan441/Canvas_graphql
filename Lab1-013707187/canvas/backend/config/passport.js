'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
//var db = require('../app/db');
var StudentLogin = require('../models/Studentdet');
var Facultydetails = require('../models/Facultydetails');

//var config = require('./settings');
const secret = "secret";
var bcrypt = require('bcrypt');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        console.log("details",jwt_payload.stufac)
        if(jwt_payload.stufac=="faculty"){
            console.log("in jwt requests",jwt_payload)
            Facultydetails.findOne({
                    facultyid: jwt_payload.username
                }, function (err, user) {
                     if (user) {
                        if (!bcrypt.compareSync(jwt_payload.password, user.password)) 
                        {
                            console.log("Invaid Credentials");
                            callback(null,null)
                        }
                        else{
                            callback(null,user)
                        }
                    }
                    else{
                        callback(null,null);
                    }
                });
        }
        else{
            console.log("in jwt requests",jwt_payload)
            StudentLogin.findOne({
                    studentid: jwt_payload.username
                }, function (err, user) {
                     if (user) {
                        if (!bcrypt.compareSync(jwt_payload.password, user.password)) 
                        {
                            console.log("Invaid Credentials");
                            callback(null,null)
                        }
                        else{
                            console.log("login sucees")
                            callback(null,user)
                        }
                    }
                    else{
                        res.writeHead(401,
                            {
                                'Content-type' : 'text/plain'
                            })
                            console.log('Invalid Credentials')
                            res.end('Invalid Credentials')
                    
                        console.log("no valid input")
                        callback(null,null);
                    }
                });
        }
 
    }));
};