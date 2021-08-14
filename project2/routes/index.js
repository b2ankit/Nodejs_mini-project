var express = require('express');
var multer = require('multer');
var img_model = require('../module/upload');
var path = require('path');
var router = express.Router();
var find_img = img_model.find({});

router.use(express.static(__dirname + "./public"));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'File upload Tutorial',result : '',imgName:'' });
});

var Storage = multer.diskStorage({
  destination:'./public/images/',
 filename:(req,file,cb) =>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }

});


var upload = multer({
  storage:Storage
  }).single('file');

router.post('/uploads',upload,function(req,res,next){
  var file_name = req.file.filename;
  var file_status =  file_name + " uploaded Successfully";

  var upload_img = new img_model({
    name : req.body.imgname,
    imgname : file_name,
  })

  upload_img.save(function(err){
    if(err)
      throw error;

      find_img.exec(function(err,data){
        if(err)
          throw error;

          console.log(data);
          res.render('index',{ title: 'File upload Tutorial',result : file_status, imgName : data})

      })

      
  });
  
})
module.exports = router;
