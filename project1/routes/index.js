var express = require('express');
var router = express.Router();
var student_record = require('../module/student');
var student = student_record.find({});

/* GET home page. */
router.get('/', function(req, res, next) {
  student.exec(function(err,data){
    if(err)
    throw error;
    res.render('index', { title: 'Student Records',records : data });
  });
  
});

router.post('/', function(req, res, next) {

  var student_insert = new student_record({
    name : req.body.name,
    age : req.body.age,
    email : req.body.email,
    address : req.body.address,
    roll:req.body.roll,
  })

    student_insert.save(function(err,res1){
      if(err)
        throw error;
        student.exec(function(err,data){
          if(err)
          throw error;
          res.render('index', { title: 'Student Records',records : data });
        });
    })
});


module.exports = router;
