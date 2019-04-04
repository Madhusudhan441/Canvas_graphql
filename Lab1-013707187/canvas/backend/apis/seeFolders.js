
var multer = require('multer');
var fs = require('fs');
var con = require('../db/sql')

const path = require('path');
var router = require('express').Router();
var con = require('../db/sql')
router.get('/seeFolders',function(req,res){
    const Filehound = require('filehound');

    Filehound.create()
      .path("./files/")
      .directory()
      .find((err, subdirectories) => {
        if (err) return console.error(err);
    
        console.log(subdirectories);
        res.send(subdirectories)
      });
})

router.get('/seeFoldFiles',function(req,res){
    // if (process.argv.length <= 2) {
    //     console.log("Usage: " + __filename + " ./public/files");
    //     process.exit(-1);
    // }
     
    console.log(req.query)
    // var path = process.argv[2];
     console.log("inside see files")
    fs.readdir( req.query.path, function(err, items) {
        //console.log(items);
     
        res.end(JSON.stringify(items));
    });
    
    
  
             
  })
  router.get('/seeFiles',function(req,res){
      // if (process.argv.length <= 2) {
      //     console.log("Usage: " + __filename + " ./public/files");
      //     process.exit(-1);
      // }
       
      // var path = process.argv[2];
       console.log("inside see files")
      fs.readdir( "./submissions/assignments/", function(err, items) {
          //console.log(items);
       
          res.end(JSON.stringify(items));
      });
      
      
  
               
  })
  router.post('/downloadfile-file/:file(*)', function(req, res){
    console.log('Inside DOwnload File');
    console.log(req.body.pathfile)
    var file = req.params.file;
    var filelocation = path.join(__dirname ,'..'+ req.body.pathfile, file);
    var img = fs.readFileSync(filelocation);
    var base64img = new Buffer(img).toString('base64');
    res.writeHead(200, {
        'Content-type': 'application/pdf'
    });
    res.end(JSON.stringify(base64img));
  
  });
  router.post('/download-file/:file(*)', function(req, res){
      console.log('Inside DOwnload File');
      var file = req.params.file;
      var filelocation = path.join(__dirname,'..' + '/submissions/assignments/', file);
      var img = fs.readFileSync(filelocation);
      var base64img = new Buffer(img).toString('base64');
      res.writeHead(200, {
          'Content-type': 'application/pdf'
      });
      res.end(JSON.stringify(base64img));
  
  });
module.exports=router